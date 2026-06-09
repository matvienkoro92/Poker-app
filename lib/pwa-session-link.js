const { getDtIdByUserId } = require("./account-id");
const { getLinkedDtIdByEmail } = require("./email-auth");
const { verifyPwaSessionToken } = require("./poker-pwa-session");

function linkedPwaSessionTokenFromBody(body) {
  const b = body && typeof body === "object" ? body : {};
  return String(
    b.linkPwaSession ||
    b.link_pwa_session ||
    b.existingPwaSession ||
    b.existing_pwa_session ||
    ""
  ).trim();
}

async function resolveDtIdFromLinkedPwaSession(body, botToken) {
  const token = linkedPwaSessionTokenFromBody(body);
  if (!token || !botToken) return "";
  const session = verifyPwaSessionToken(token, botToken);
  if (!session) return "";
  const memberId = String(session.memberId || "").trim();
  if (memberId) {
    const dtId = await getDtIdByUserId(memberId);
    if (dtId) return String(dtId).trim();
  }
  const email = String(session.email || "").trim();
  if (email) {
    const dtIdByEmail = await getLinkedDtIdByEmail(email);
    if (dtIdByEmail) return String(dtIdByEmail).trim();
  }
  return "";
}

module.exports = { resolveDtIdFromLinkedPwaSession };
