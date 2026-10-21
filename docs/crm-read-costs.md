# CRM read costs

The CRM loads broadcast recipients only when the broadcast tab is opened. The
`compact=1` send response carries a field schema and compact rows. Clients expand
these into the same recipient/filter objects; older clients retain the original
response. Delivery still resolves recipients and exclusions on the server.

Analytics uses a shared gzip Redis cache in addition to the existing process cache:

- complete period summary: 60 seconds;
- raw analytics day snapshots: 15 seconds for today and the preceding boundary
  window; 24 hours for completed days. Event ingestion uses authoritative server
  time and does not backdate writes. Identity links are resolved live when a period
  summary is rebuilt;
- link journeys/events/subscription flags: 30 seconds, shared between aggregate
  summaries and player matrices. Canonical groups, subjects and repeated reads are
  memoized only for the current request. Matrix names/levels and access permissions
  are checked independently; private category access is checked again before return.

Cached data is derived, compressed, size bounded and expires in Redis. Corrupt,
expired or inaccessible cache entries fall back to live reads. Failed builds and
incomplete participant enrichment are not cached. A historical analytics repair
must invalidate its `analytics-day` cache entries (or advance that namespace) before
checking repaired totals. Cache keys are defined in `lib/crm-read-cache.js`.

Measured on the configured dataset, 2026-10-22:

| Operation | Before | After |
| --- | --- | --- |
| Broadcast HTTP body, before HTTP compression, 1,319 eligible recipients | 1,414,531 bytes | 261,934 bytes |
| Link list, 56 links | 169 Redis commands | 59 Redis commands |
| Link summary, first read | 1,559 Redis commands | 617 Redis commands |
| Same link summary, cached snapshot | Full rebuild | 5 Redis commands; all summary values identical |
| Core in a new server instance, shared summary cache available | 1,106 commands / 82,160,794 response bytes | 142 commands / 2,986,216 response bytes |
| Core, analytics summary expired but historical day cache available | 1,106 commands / 82,160,794 response bytes | 546 commands / 27,366,975 response bytes |

A completely empty cache still requires the initial historical scan and cache
population. It must not be described as a cheap cold read. Timings depend on Redis
latency. Command counts refer to commands sent through the REST API, not internal
Lua operations, provider billing, or HTTP request counts. The earlier 20.6 MB send
measurement described the internal unfiltered collection of 19,543 records; it was
not the actual HTTP response.
