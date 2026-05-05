// Spring rating seasonal data. Loaded eagerly; winter data stays lazy in winter-rating-data.js.

// Рейтинг ВЕСНЫ: только март, не смешивается с зимой. Календарь и итоговые таблицы Лига 1/2.
// Скрины за дату по лигам — Лига 1 (то, что скидывали), Лига 2 отдельно.
var SPRING_RATING_IMAGES_LEAGUE1 = {
  "01.03.2026": ["rating-01-03-2026.png", "rating-01-03-2026-2.png", "rating-01-03-2026-3.png", "rating-01-03-2026-4.png", "rating-01-03-2026-5.png", "rating-01-03-2026-6.png", "rating-01-03-2026-7.png", "rating-01-03-2026-8.png"],
  "02.03.2026": ["rating-02-03-2026.png", "rating-02-03-2026-2.png", "rating-02-03-2026-3.png", "rating-02-03-2026-4.png", "rating-02-03-2026-5.png", "rating-02-03-2026-6.png", "rating-02-03-2026-7.png", "rating-02-03-2026-8.png", "rating-02-03-2026-9.png"],
  "03.03.2026": ["rating-03-03-2026.png", "rating-03-03-2026-2.png", "rating-03-03-2026-3.png", "rating-03-03-2026-4.png", "rating-03-03-2026-5.png", "rating-03-03-2026-6.png"],
  "04.03.2026": ["rating-04-03-2026-1.png", "rating-04-03-2026-2.png", "rating-04-03-2026-3.png", "rating-04-03-2026-tai7ko20k.png", "rating-04-03-2026-dvbounty150k.png", "rating-04-03-2026-hotpko.png", "rating-04-03-2026-6holdem500.png", "rating-04-03-2026-dva-tuza-dollars.png", "rating-04-03-2026-freeroll1mln.png", "rating-04-03-2026-nightmagic100k.png"],
  "05.03.2026": ["rating-05-03-2026-1.png", "rating-05-03-2026-2.png", "rating-05-03-2026-3.png", "rating-05-03-2026-4.png", "rating-05-03-2026-5.png", "rating-05-03-2026-6.png", "rating-05-03-2026-7.png", "rating-05-03-2026-8.png", "rating-05-03-2026-9.png", "rating-05-03-2026-10.png", "rating-05-03-2026-11.png", "rating-05-03-2026-12.png", "rating-05-03-2026-14.png", "rating-05-03-2026-hyper-turbo-300.png"],
  "06.03.2026": ["rating-06-03-2026-1.png", "rating-06-03-2026-2.png", "rating-06-03-2026-3.png", "rating-06-03-2026-4.png", "rating-06-03-2026-5.png", "rating-06-03-2026-6.png", "rating-06-03-2026-7.png", "rating-06-03-2026-8.png"],
  "07.03.2026": ["rating-07-03-2026-1.png", "rating-07-03-2026-2.png", "rating-07-03-2026-3.png", "rating-07-03-2026-4.png", "rating-07-03-2026-5.png", "rating-07-03-2026-6.png", "rating-07-03-2026-7.png", "rating-07-03-2026-8.png", "rating-07-03-2026-9.png", "rating-07-03-2026-10.png", "rating-07-03-2026-league1-6.png"],
  "08.03.2026": ["rating-08-03-2026-league2-1.png", "rating-08-03-2026-2.png", "rating-08-03-2026-3.png", "rating-08-03-2026-4.png", "rating-08-03-2026-5.png", "rating-08-03-2026-6.png", "rating-08-03-2026-7.png"],
  "09.03.2026": ["rating-09-03-2026-1.png", "rating-09-03-2026-2.png", "rating-09-03-2026-3.png", "rating-09-03-2026-4.png", "rating-09-03-2026-5.png", "rating-09-03-2026-6.png", "rating-09-03-2026-7.png", "rating-09-03-2026-8.png"],
  "10.03.2026": ["rating-10-03-2026-1.png", "rating-10-03-2026-2.png", "rating-10-03-2026-3.png", "rating-10-03-2026-4.png", "rating-10-03-2026-5.png", "rating-10-03-2026-6.png", "rating-10-03-2026-7.png"],
  "11.03.2026": ["rating-11-03-2026-1.png", "rating-11-03-2026-2.png", "rating-11-03-2026-3.png", "rating-11-03-2026-4.png", "rating-11-03-2026-5.png", "rating-11-03-2026-6.png"],
  "12.03.2026": ["rating-12-03-2026-1.png", "rating-12-03-2026-2.png", "rating-12-03-2026-3.png", "rating-12-03-2026-4.png", "rating-12-03-2026-5.png", "rating-12-03-2026-6.png", "rating-12-03-2026-7.png"],
  "13.03.2026": ["rating-13-03-2026-1.png", "rating-13-03-2026-2.png", "rating-13-03-2026-3.png", "rating-13-03-2026-4.png", "rating-13-03-2026-5.png"],
  "14.03.2026": ["rating-14-03-2026-1.png", "rating-14-03-2026-2.png", "rating-14-03-2026-3.png", "rating-14-03-2026-4.png", "rating-14-03-2026-5.png", "rating-14-03-2026-6.png", "rating-14-03-2026-7.png"],
  "15.03.2026": [
    "IMG_7765_2-c07ccd00-fe1e-4932-9710-74a483bb95a2.png",
    "IMG_7766-648c166a-671a-4593-875f-d73903100daa.png",
    "IMG_7767-7c475e72-02dd-419c-8ee1-c98f2471c8be.png",
    "IMG_7773-91ae4087-27aa-472e-b89e-002bb5e725c8.png",
    "IMG_7768-8e6982ce-6eb7-4d31-95a3-11242d686d4d.png",
    "IMG_7769-488ee3d5-8fff-4b1a-92e8-1d2d5f0e51a8.png"
  ],
  "16.03.2026": [
    "IMG_7778-ae4fcfca-0457-4e9d-8b02-ed4114735ce6.png",
    "IMG_7777-7acacd48-59ff-47aa-b508-4794ddf50575.png",
    "IMG_7775-0c6fe96f-a6d0-44de-b5da-0d17a81ba615.png",
    "IMG_7776-66f23d9d-f1f6-476e-ad8d-12a762e6d46f.png",
    "IMG_7781-62b82843-c14f-4eb7-89b0-fee8ff0cd181.png",
    "IMG_7779-a25813c0-ecc4-46e2-95ba-5e0558b4b652.png"
  ],
  "17.03.2026": [
    "IMG_7806-e95ad4ac-54af-4280-9bb6-495e0078d87d.png",
    "IMG_7803-d87ef34b-c0e0-4f82-8578-70dc1bbe3386.png",
    "IMG_7804-3215b08a-3295-40b4-9747-0cdc20b4bf19.png",
    "IMG_7814-2345ae69-ea53-47c0-a650-79da764639be.png",
    "IMG_7813-12c7d53a-4a35-41e5-85bb-f184a328eefa.png",
    "IMG_7811-9915904e-bd08-4db1-b3e6-7afac83cb1f6.png",
    "IMG_7810-1e508b07-c18a-4f60-b842-4eeb486bc3f7.png",
    "IMG_7809-954411fb-fd01-484c-8f4a-5615c7a20b1b.png",
    "IMG_7808-6673993a-3e38-41a2-9785-1bf683611fae.png",
    "IMG_7807-1ff34e0d-24a7-405c-9ba6-21cfd9ea2883.png"
  ],
  "18.03.2026": [
    "IMG_7871-77d662ce-5536-41b7-9acc-8c4a9e0fef0c.png",
    "IMG_7869-7defa8f5-c24f-4b92-b90c-9f46b1f29c1e.png",
    "IMG_7864-91a41ed8-6107-4574-a376-f0be012ecefb.png",
    "IMG_7868-09f652d0-ea87-46e5-ab3a-5d1824184662.png",
    "IMG_7862-3fb88667-00f5-4704-bc98-3a9324a6c4d7.png",
    "IMG_7867-2c792a41-844e-491f-a55a-ae7d06d3146d.png",
    "IMG_7860-4b343450-bf87-4c72-95fd-3264646c4579.png",
    "IMG_7866-005d7c49-4f56-41cc-a92e-65739f200b9d.png"
  ],
  "19.03.2026": [
    "IMG_7878-314ec50e-ea77-471f-b3a7-89f04b69fa81.png",
    "IMG_7877-d72519a5-d3e8-41b6-85e4-797e0a0fc8a4.png",
    "IMG_7874-3003bf77-ed25-4624-ad7a-e93dd46ec643.png",
    "IMG_7873-4c8637bb-6a78-4e45-8c9d-5f5c282487fc.png",
    "IMG_7876-202ff629-c83b-4c6a-aeda-04478ab7ae54.png",
    "IMG_7872-bee2000c-88b5-4a48-931f-df60cb7d1bea.png"
  ],
  "20.03.2026": [
    "rating-20-03-2026-league1-1-sbounty.png",
    "rating-20-03-2026-league1-2-dvplo5.png",
    "rating-20-03-2026-league1-3-dvbounty150k.png",
    "rating-20-03-2026-league1-4-hotpko.png",
    "rating-20-03-2026-league1-5-rebuy.png",
    "rating-20-03-2026-league1-6-friday-progressive.png"
  ],
  "21.03.2026": [
    "rating-21-03-2026-league1-dv-rebuy-12h.png",
    "rating-21-03-2026-league1-rebuy-17h.png",
    "rating-21-03-2026-league1-hok-magic-20h.png",
    "rating-21-03-2026-league1-magic-mko-22h.png"
  ],
  "22.03.2026": [
    "rating-22-03-2026-league1-dv-turbo-10h.png",
    "rating-22-03-2026-league1-dv-rebuy-12h.png",
    "rating-22-03-2026-league1-dv-main-13h.png",
    "rating-22-03-2026-league1-frankl-dva-tuza-fast-deep-rank2.png",
    "rating-22-03-2026-league1-frankl-dva-tuza-fast-deep-rank1.png",
    "rating-22-03-2026-league1-frankl-dva-tuza-fast-pko.png",
    "rating-22-03-2026-league1-frankl-dva-tuza-daily-pko.png",
    "rating-22-03-2026-league1-frankl-wow-mystery.png",
    "rating-22-03-2026-league1-rebuy-17h.png",
    "rating-22-03-2026-league1-sunday-18h.png"
  ],
  "23.03.2026": [
    "rating-23-03-2026-league1-tai7-ko-06h.png",
    "rating-23-03-2026-league1-frankl-dva-tuza-fast-deep-rank3.png",
    "rating-23-03-2026-league1-bali-yana-08h.png",
    "rating-23-03-2026-league1-dv-rebuy-12h.png",
    "rating-23-03-2026-league1-dv-bounty-150k-13h.png",
    "rating-23-03-2026-league1-monday-250k-18h.png",
    "rating-23-03-2026-league1-tournir-ponedelnika-18h.png",
    "rating-23-03-2026-league1-nok-ko-20h.png",
    "rating-23-03-2026-league1-nlh-knockout-250k-21h.png",
    "rating-23-03-2026-league1-magic-150k-22h.png",
    "rating-23-03-2026-league1-night-magic-100k-23h.png"
  ],
  "24.03.2026": [
    "rating-24-03-2026-league1-bali-yana-08h.png",
    "rating-24-03-2026-league1-dv-plo5-12h.png",
    "rating-24-03-2026-league1-dv-rebuy-12h.png",
    "rating-24-03-2026-league1-hot-pko-15h.png",
    "rating-24-03-2026-league1-rebuy-17h.png",
    "rating-24-03-2026-league1-bounty-magic-18h.png",
    "rating-24-03-2026-league1-hok-magic-20h.png"
  ],
  "25.03.2026": [
    "rating-25-03-2026-league1-s-bounty-2-3-150k-pko-00h.png",
    "rating-25-03-2026-league1-dv-rebuy-12h.png",
    "rating-25-03-2026-league1-rebuy-17h.png",
    "rating-25-03-2026-league1-nok-ko-20h.png"
  ],
  "26.03.2026": [
    "rating-26-03-2026-league1-tai-7-ko-20k-06h.png",
    "rating-26-03-2026-league1-dv-rebuy-12h.png",
    "rating-26-03-2026-league1-new-hot-pko-2-3-15h.png",
    "rating-26-03-2026-league1-rebuy-17h.png",
    "rating-26-03-2026-league1-tournir-chetverga-18h.png",
    "rating-26-03-2026-league1-nlh-knockout-250k-21h.png",
    "rating-26-03-2026-league1-magic-500-150k-22h.png"
  ],
  "27.03.2026": [
    "rating-27-03-2026-league1-dv-rebuy-12h.png",
    "rating-27-03-2026-league1-dv-bounty-150k-pko-13h.png",
    "rating-27-03-2026-league1-rebuy-17h.png",
    "rating-27-03-2026-league1-pyatnitsa-progressiv-18h.png"
  ],
  "28.03.2026": [
    "rating-28-03-2026-league1-s-bounty-150k-00h.png",
    "rating-28-03-2026-league1-tai-7-ko-20k-06h.png",
    "rating-28-03-2026-league1-dv-turbo-500-90k-10h.png",
    "rating-28-03-2026-league1-dv-bounty-150k-pko-13h.png",
    "rating-28-03-2026-league1-new-hot-pko-2-3-15h.png",
    "rating-28-03-2026-league1-rebuy-17h.png",
    "rating-28-03-2026-league1-lucky-777-gtd-18h.png",
    "rating-28-03-2026-league1-hok-20h.png",
    "rating-28-03-2026-league1-magic-500-150k-22h.png",
    "rating-28-03-2026-league1-night-magic-100k-23h.png"
  ],
  "29.03.2026": [
    "rating-29-03-2026-league1-s-bounty-150k-00h.png",
    "rating-29-03-2026-league1-dv-turbo-500-90k-10h.png",
    "rating-29-03-2026-league1-dv-main-1mln-13h.png",
    "rating-29-03-2026-league1-new-hot-pko-2-3-15h.png",
    "rating-29-03-2026-league1-rebuy-17h.png",
    "rating-29-03-2026-league1-voskresnyj-18h.png",
    "rating-29-03-2026-league1-hok-magic-20h.png",
    "rating-29-03-2026-league1-hr-5000-250k-2159.png"
  ],
  "30.03.2026": [
    "rating-30-03-2026-league1-dv-rebuy-12h.png",
    "rating-30-03-2026-league1-rebuy-17h.png",
    "rating-30-03-2026-league1-tournir-ponedelnika-18h.png"
  ],
  "31.03.2026": [
    "rating-31-03-2026-league1-dv-rebuy-12h.png",
    "rating-31-03-2026-league1-dv-bounty-150k-pko-13h.png",
    "rating-31-03-2026-league1-6-plus-holdem-500-15h.png",
    "rating-31-03-2026-league1-new-hot-pko-2-3-15h.png",
    "rating-31-03-2026-league1-rebuy-17h.png",
    "rating-31-03-2026-league1-magic-500-150k-22h.png"
  ],
  "01.04.2026": [
    "rating-01-04-2026-league1-s-bounty-2-3-150k-00h.png",
    "rating-01-04-2026-league1-dv-rebuy-12h.png",
    "rating-01-04-2026-league1-rebuy-17h.png"
  ],
  "02.04.2026": [
    "rating-02-04-2026-league1-s-bounty-2-3-150k-00h.png",
    "rating-02-04-2026-league1-bali-yana-08h.png",
    "rating-02-04-2026-league1-6-plus-holdem-500-15h.png",
    "rating-02-04-2026-league1-new-hot-pko-2-3-15h.png",
    "rating-02-04-2026-league1-rebuy-17h.png",
    "rating-02-04-2026-league1-tournir-chetverga-18h.png",
    "rating-02-04-2026-league1-nok-ko-20h.png",
    "rating-02-04-2026-league1-magic-500-150k-22h.png"
  ],
  "03.04.2026": [
    "rating-03-04-2026-league1-dv-rebuy-12h.png",
    "rating-03-04-2026-league1-new-hot-pko-2-3-15h.png",
    "rating-03-04-2026-league1-rebuy-17h.png",
    "rating-03-04-2026-league1-pyatnitsa-progressiv-18h.png",
    "rating-03-04-2026-league1-shr-1-mln-gtd-18h.png",
    "rating-03-04-2026-league1-magic-500-150k-22h.png",
    "rating-03-04-2026-league1-night-magic-100k-23h.png"
  ],
  "04.04.2026": [
    "rating-04-04-2026-league1-s-bounty-2-3-150k-00h.png",
    "rating-04-04-2026-league1-dv-turbo-500-90k-10h.png",
    "rating-04-04-2026-league1-dv-rebuy-12h.png",
    "rating-04-04-2026-league1-new-hot-pko-2-3-15h.png",
    "rating-04-04-2026-league1-nok-20h.png"
  ],
  "05.04.2026": [
    "rating-05-04-2026-league1-s-bounty-2-3-150k-00h.png",
    "rating-05-04-2026-league1-dv-rebuy-12h.png",
    "rating-05-04-2026-league1-6plus-holdem-500-15h.png",
    "rating-05-04-2026-league1-rebuy-17h.png",
    "rating-05-04-2026-league1-voskresnyj-tournir-18h.png",
    "rating-05-04-2026-league1-crazy-main-event-frankl.png"
  ],
  "06.04.2026": [
    "rating-06-04-2026-league1-tai-7-ko-20k-06h.png",
    "rating-06-04-2026-league1-bali-yana-30k-08h.png",
    "rating-06-04-2026-league1-dv-turbo-500-90k-10h.png",
    "rating-06-04-2026-league1-dv-rebuy-12h.png",
    "rating-06-04-2026-league1-dv-bounty-150k-13h.png",
    "rating-06-04-2026-league1-new-hot-pko-2-3-15h.png",
    "rating-06-04-2026-league1-tournir-ponedelnika-18h.png",
    "rating-06-04-2026-league1-nok-20h.png",
    "rating-06-04-2026-league1-nlh-knockout-250k-21h.png"
  ],
  "07.04.2026": [
    "rating-07-04-2026-league1-s-bounty-2-3-150k-00h.png",
    "rating-07-04-2026-league1-tai-7-ko-20k-06h.png",
    "rating-07-04-2026-league1-dv-plo5-30k-12h.png",
    "rating-07-04-2026-league1-dv-rebuy-12h.png",
    "rating-07-04-2026-league1-dv-bounty-150k-13h.png",
    "rating-07-04-2026-league1-new-hot-pko-15h.png",
    "gazette-frankl-bounty-magic-april7-2026.png"
  ],
  "08.04.2026": [
    "rating-08-04-2026-league1-dv-turbo-500-90k-10h.png",
    "rating-08-04-2026-league1-dv-bounty-150k-13h.png",
    "rating-08-04-2026-league1-rebuy-17h.png",
    "rating-08-04-2026-league1-freeroll-1mln-18h.png",
    "rating-08-04-2026-league1-private-500-1930h.png",
    "rating-08-04-2026-league1-magic-500-150k-22h.png",
    "rating-08-04-2026-league1-night-magic-100k-23h.png"
  ],
  "09.04.2026": [
    "rating-09-04-2026-league1-s-bounty-2-3-150k-00h.png",
    "rating-09-04-2026-league1-bali-yana-30k-08h.png",
    "rating-09-04-2026-league1-dv-rebuy-12h.png",
    "rating-09-04-2026-league1-rebuy-17h.png",
    "rating-09-04-2026-league1-tournir-chetverga-18h.png",
    "rating-09-04-2026-league1-nlh-knockout-250k-21h.png",
    "rating-09-04-2026-league1-night-magic-100k-23h.png"
  ],
  "10.04.2026": [
    "rating-10-04-2026-league1-s-bounty-2-3-150k-00h.png",
    "rating-10-04-2026-league1-dv-rebuy-12h.png",
    "rating-10-04-2026-league1-6plus-500-15h.png",
    "rating-10-04-2026-league1-rebuy-17h.png",
    "rating-10-04-2026-league1-friday-progressive-18h.png",
    "rating-10-04-2026-league1-nlh-bounty-400k-18h.png",
    "rating-10-04-2026-league1-magic-500-150k-22h.png"
  ],
  "11.04.2026": [
    "rating-11-04-2026-league1-dv-plo5-30k-12h.png",
    "rating-11-04-2026-league1-dv-rebuy-12h.png",
    "rating-11-04-2026-league1-new-hot-pko-15h.png",
    "rating-11-04-2026-league1-rebuy-17h.png",
    "rating-11-04-2026-league1-classic-6max-19h.png",
    "rating-11-04-2026-league1-night-magic-100k-23h.png",
    "rating-11-04-2026-league1-dva-tuza-dollars-jackpot-a-4ezzi.jpg"
  ],
  "12.04.2026": [
    "rating-12-04-2026-league1-bali-yana-30k-08h.png",
    "rating-12-04-2026-league1-dv-turbo-500-90k-10h.png",
    "rating-12-04-2026-league1-dv-rebuy-12h.png",
    "rating-12-04-2026-league1-main-25m-gtd-18h.png",
    "rating-12-04-2026-league1-voskresnyj-tournir-18h.png",
    "rating-12-04-2026-league1-classic-6max-19h.png",
    "rating-12-04-2026-league1-magic-500-150k-2159h.png"
  ],
  "13.04.2026": [
    "rating-13-04-2026-league1-tai-7-ko-20k-06h.png",
    "rating-13-04-2026-league1-dv-turbo-500-90k-10h.png",
    "rating-13-04-2026-league1-dv-rebuy-12h.png",
    "rating-13-04-2026-league1-dv-bounty-150k-13h.png",
    "rating-13-04-2026-league1-new-hot-pko-2-3-15h.png",
    "rating-13-04-2026-league1-tournir-ponedelnika-18h.png",
    "rating-13-04-2026-league1-monday-250k-18h.png",
    "rating-13-04-2026-league1-classic-6max-19h.png"
  ],
  "14.04.2026": [
    "rating-14-04-2026-league1-dv-rebuy-12h.png",
    "rating-14-04-2026-league1-classic-500-17h.png",
    "rating-14-04-2026-league1-bounty-magic-400k-18h.jpg",
    "rating-14-04-2026-league1-nlh-knockout-220k-21h.jpg"
  ],
  "15.04.2026": [
    "rating-15-04-2026-league1-s-bounty-120k-00h.jpg",
    "rating-15-04-2026-league1-classic-500-17h.png",
    "rating-15-04-2026-league1-freeroll-1mln-18h.jpg",
    "rating-15-04-2026-league1-night-magic-80k-23h.jpg"
  ],
  "16.04.2026": [
    "rating-16-04-2026-league1-s-bounty-120k-00h.jpg",
    "rating-16-04-2026-league1-tai-7-ko-15k-06h.jpg",
    "rating-16-04-2026-league1-dv-rebuy-12h.png",
    "rating-16-04-2026-league1-dv-bounty-100k-13h.jpg",
    "rating-16-04-2026-league1-classic-500-17h.png",
    "rating-16-04-2026-league1-tournir-chetverga-18h.png",
    "rating-16-04-2026-league1-nlh-knockout-220k-21h.jpg",
    "rating-16-04-2026-league1-night-magic-80k-23h.jpg"
  ],
  "17.04.2026": [
    "rating-17-04-2026-league1-dv-rebuy-12h.png",
    "rating-17-04-2026-league1-s-bounty-120k-00h.jpg",
    "rating-17-04-2026-league1-dv-bounty-100k-13h.jpg",
    "rating-17-04-2026-league1-new-hot-pko-15h.jpg",
    "rating-17-04-2026-league1-friday-progressive-18h.png",
    "rating-17-04-2026-league1-big-evening-19h.png",
    "rating-17-04-2026-league1-dva-tuza-dollars-jackpot-b-waaar.jpg"
  ],
  "18.04.2026": [
    "rating-18-04-2026-league1-s-bounty-120k-00h.jpg",
    "rating-18-04-2026-league1-dv-turbo-500-60k-10h.jpg",
    "rating-18-04-2026-league1-holdem-6plus-30k-16h.jpg",
    "rating-18-04-2026-league1-big-evening-19h.png",
    "rating-18-04-2026-league1-nlh-knockout-220k-21h.jpg",
    "rating-18-04-2026-league1-dva-tuza-dollars-crazy-waaar.jpg"
  ],
  "19.04.2026": [
    "rating-19-04-2026-league1-dv-rebuy-12h.png",
    "rating-19-04-2026-league1-dv-turbo-500-60k-10h.jpg",
    "rating-19-04-2026-league1-voskresnyj-tournir-18h.png",
    "rating-19-04-2026-league1-nlh-knockout-220k-21h.jpg",
    "rating-19-04-2026-league1-dva-tuza-dollars-fast-crazy-4ezzi.jpg"
  ],
  "20.04.2026": [
    "rating-20-04-2026-league1-dv-turbo-500-60k-10h.jpg",
    "rating-20-04-2026-league1-dv-plo5-30k-12h.jpg",
    "rating-20-04-2026-league1-dv-rebuy-12h.png",
    "rating-20-04-2026-league1-dv-bounty-100k-13h.jpg",
    "rating-20-04-2026-league1-new-hot-pko-2-3-15h.jpg",
    "rating-20-04-2026-league1-tournir-ponedelnika-18h.png",
    "rating-20-04-2026-league1-big-evening-19h.png",
    "rating-20-04-2026-league1-nlh-knockout-220k-21h.jpg",
    "rating-20-04-2026-league1-magic-500-120k-22h.jpg",
    "rating-20-04-2026-league1-night-magic-80k-23h.jpg",
    "rating-20-04-2026-league1-dva-tuza-dollars-deep-freeze-waaar.jpg",
    "rating-20-04-2026-league1-dva-tuza-dollars-wow-mystery-waaar.jpg"
  ],
  "21.04.2026": [
    "rating-21-04-2026-league1-dv-plo5-30k-12h.jpg",
    "rating-21-04-2026-league1-dv-rebuy-12h.png",
    "rating-21-04-2026-league1-nlh-knockout-220k-21h.jpg",
    "rating-21-04-2026-league1-night-magic-80k-23h.jpg",
    "rating-21-04-2026-league1-dva-tuza-dollars-crazy-waaar.jpg"
  ],
  "22.04.2026": [
    "rating-22-04-2026-league1-s-bounty-2-3-120k-00h.jpg",
    "rating-22-04-2026-league1-tai-7-ko-15k-06h.jpg",
    "rating-22-04-2026-league1-bali-yana-20k-08h.jpg",
    "rating-22-04-2026-league1-6plus-holdem-500-15h.jpg",
    "rating-22-04-2026-league1-big-evening-19h.png"
  ],
  "23.04.2026": [
    "rating-23-04-2026-league1-s-bounty-2-3-120k-00h.jpg",
    "rating-23-04-2026-league1-dv-rebuy-12h.png",
    "rating-23-04-2026-league1-tournir-chetverga-18h.png"
  ],
  "24.04.2026": [
    "rating-24-04-2026-league1-s-bounty-2-3-120k-00h.jpg",
    "rating-24-04-2026-league1-new-hot-pko-2-3-15h.jpg",
    "rating-24-04-2026-league1-dv-rebuy-12h.jpg",
    "rating-24-04-2026-league1-friday-progressive-18h.jpg",
    "rating-24-04-2026-league1-magic-500-120k-22h.jpg"
  ],
  "25.04.2026": [
    "rating-25-04-2026-league1-bali-yana-20k-08h.jpg",
    "rating-25-04-2026-league1-dv-rebuy-12h.jpg",
    "rating-25-04-2026-league1-dv-bounty-100k-13h.jpg",
    "rating-25-04-2026-league1-new-hot-pko-2-3-15h.jpg",
    "rating-25-04-2026-league1-lucky-777-gtd-18h.jpg"
  ],
  "26.04.2026": [
    "rating-26-04-2026-league1-dv-rebuy-12h.jpg",
    "rating-26-04-2026-league1-voskresnyj-tournir-18h.jpg",
    "rating-26-04-2026-league1-tai-7-ko-06h.jpg",
    "rating-26-04-2026-league1-kg-plo6-09h.jpg",
    "rating-26-04-2026-league1-new-hot-pko-15h.jpg",
    "rating-26-04-2026-league1-holdem-6plus-16h.jpg"
  ]
};
var SPRING_RATING_IMAGES_LEAGUE2 = {
  "01.03.2026": ["rating-01-03-2026-league2-1.png", "rating-01-03-2026-league2-2.png", "rating-01-03-2026-league2-3.png"],
  "02.03.2026": ["rating-02-03-2026-league2-1.png", "rating-02-03-2026-league2-2.png", "rating-02-03-2026-league2-3.png"],
  "03.03.2026": ["rating-03-03-2026-league2-1.png", "rating-03-03-2026-league2-2.png", "rating-03-03-2026-league2-3.png", "rating-03-03-2026-league2-4.png", "rating-03-03-2026-tuesday-1.png", "rating-03-03-2026-tuesday-2.png", "rating-03-03-2026-tuesday-3.png"],
  "04.03.2026": ["rating-04-03-2026-1.png", "rating-04-03-2026-2.png", "rating-04-03-2026-3.png", "rating-04-03-2026-wednesday-1.png", "rating-04-03-2026-wednesday-2.png", "rating-04-03-2026-plo4-25k.png", "rating-04-03-2026-plo5-300.png"],
  "05.03.2026": ["rating-05-03-2026-13.png", "rating-05-03-2026-league2-2.png"],
  "06.03.2026": ["rating-06-03-2026-league2-1.png", "rating-06-03-2026-league2-2.png", "rating-06-03-2026-league2-3.png", "rating-06-03-2026-league2-4.png"],
  "07.03.2026": ["rating-07-03-2026-league2-1.png", "rating-07-03-2026-league2-2.png", "rating-07-03-2026-league2-3.png", "rating-07-03-2026-league2-4.png", "rating-07-03-2026-league2-5.png"],
  "08.03.2026": ["rating-08-03-2026-league2-2.png", "rating-08-03-2026-league2-3.png", "rating-08-03-2026-league2-4.png"],
  "09.03.2026": ["rating-09-03-2026-league2-1.png", "rating-09-03-2026-league2-2.png"],
  "10.03.2026": ["rating-10-03-2026-league2-1.png", "rating-10-03-2026-league2-2.png", "rating-10-03-2026-league2-3.png"],
  "11.03.2026": ["rating-11-03-2026-league2-1.png", "rating-11-03-2026-league2-2.png", "rating-11-03-2026-league2-3.png", "rating-11-03-2026-league2-4.png"],
  "12.03.2026": ["rating-12-03-2026-league2-1.png", "rating-12-03-2026-league2-2.png"],
  "13.03.2026": ["rating-13-03-2026-league2-1.png", "rating-13-03-2026-league2-2.png", "rating-13-03-2026-league2-3.png"],
  "14.03.2026": ["rating-14-03-2026-league2-1.png", "rating-14-03-2026-league2-2.png", "rating-14-03-2026-league2-3.png", "rating-14-03-2026-league2-4.png", "rating-14-03-2026-league2-5.png", "rating-14-03-2026-league2-6.png"],
  "15.03.2026": [
    "IMG_7764_2-2b13d282-b1b3-4066-94c0-1eb7c5898ea8.png",
    "IMG_7770-d09ccdad-3b96-46b4-9c72-07dbc13f8cf3.png",
    "IMG_7772-f09296fe-b0fa-4710-abb6-f27f4ae5e2a3.png",
    "IMG_7771-83f59757-02f5-43de-8514-d7ba6ad148be.png"
  ],
  "16.03.2026": [
    "IMG_7780-ec5b008a-8bb4-4175-8344-1f5086e6f5a4.png",
    "IMG_7784_2-f4e7373e-d5d2-42ea-9dab-a6db2157602a.png",
    "IMG_7783-7d627443-8565-4aaf-b1a7-1c9b3c290412.png"
  ],
  "17.03.2026": [
    "IMG_7805-69b2c55f-0045-4627-9a6d-5e2cdffefd45.png",
    "IMG_7812-5579eb6a-6531-4c28-bd65-12e8c03509cd.png",
    "IMG_7805-4aadc6ad-fb75-4dc1-85df-80d52482be74.png"
  ],
  "18.03.2026": [
    "IMG_7870-129e47f5-c24c-4e52-85d9-bb5d2bb97c18.png",
    "IMG_7863-3a0fb1eb-a07b-47d3-af8b-8e7d3c39c121.png",
    "IMG_7861-f93e1a2a-86cb-43a1-9839-125dbdb374ae.png",
    "IMG_7859-ab07511d-ac65-40e2-9dc5-35e1f3fbec69.png"
  ],
  "19.03.2026": [
    "IMG_7875-b5d82878-69b9-40b4-8b65-afc03915b672.png"
  ],
  "20.03.2026": [
    "rating-20-03-2026-league2-1-magic-bounty-60k.png",
    "rating-20-03-2026-league2-2-mko-7max-20h.png"
  ],
  "21.03.2026": [
    "rating-21-03-2026-league2-bali-yana-30k-08h.png"
  ],
  "22.03.2026": [
    "rating-22-03-2026-league2-magic-bounty-60k-11h.png",
    "rating-22-03-2026-league2-mok-21h.png"
  ],
  "23.03.2026": [
    "rating-23-03-2026-league2-kg-plo6-09h.png",
    "rating-23-03-2026-league2-mko-7max-21h.png"
  ],
  "24.03.2026": [
    "rating-24-03-2026-league2-kg-plo6-09h.png",
    "rating-24-03-2026-league2-tournir-vtornika-18h.png"
  ],
  "25.03.2026": [
    "rating-25-03-2026-league2-bounty-200-70k-pko-14h.png",
    "rating-25-03-2026-league2-tournir-sredy-18h.png",
    "rating-25-03-2026-league2-mko-7max-21h.png"
  ],
  "26.03.2026": [
    "rating-26-03-2026-league2-deep-night-20k-02h.png",
    "rating-26-03-2026-league2-micro-200-70k-gtd-14h.png"
  ],
  "27.03.2026": [
    "rating-27-03-2026-league2-hyper-turbo-300-20h.png",
    "rating-27-03-2026-league2-mko-7max-21h.png"
  ],
  "28.03.2026": [
    "rating-28-03-2026-league2-deep-night-20k-02h.png",
    "rating-28-03-2026-league2-plo4-25k-16h.png",
    "rating-28-03-2026-league2-mko-7max-21h.png"
  ],
  "29.03.2026": [
    "rating-29-03-2026-league2-magic-bounty-60k-11h.png",
    "rating-29-03-2026-league2-tournament-rebuy-14h.png",
    "rating-29-03-2026-league2-plo4-25k-16h.png",
    "rating-29-03-2026-league2-plo5-300-20h.png",
    "rating-29-03-2026-league2-mko-7max-21h.png"
  ],
  "30.03.2026": [
    "rating-30-03-2026-league2-mko-7max-21h.png"
  ],
  "31.03.2026": [
    "rating-31-03-2026-league2-kg-plo6-09h.png",
    "rating-31-03-2026-league2-tournir-vtornika-18h.png"
  ],
  "01.04.2026": [
    "rating-01-04-2026-league2-deep-night-20k-02h.png",
    "rating-01-04-2026-league2-bali-yana-30k-08h.png",
    "rating-01-04-2026-league2-kg-plo6-09h.png",
    "rating-01-04-2026-league2-magic-bounty-60k-11h.png",
    "rating-01-04-2026-league2-dv-plo5-30k-12h.png",
    "rating-01-04-2026-league2-tournir-sredy-18h.png",
    "rating-01-04-2026-league2-plo5-300-19h.png"
  ],
  "02.04.2026": [
    "rating-02-04-2026-league2-magic-bounty-60k-11h.png",
    "rating-02-04-2026-league2-hyper-turbo-300-20h.png"
  ],
  "03.04.2026": [
    "rating-03-04-2026-league2-mko-7max-21h.png"
  ],
  "04.04.2026": [
    "rating-04-04-2026-league2-deep-night-20k-02h.png",
    "rating-04-04-2026-league2-magic-bounty-60k-11h.png",
    "rating-04-04-2026-league2-plo4-25k-16h.png",
    "rating-04-04-2026-league2-hyper-turbo-300-20h.png",
    "rating-04-04-2026-league2-mok-mko-7max-21h.png"
  ],
  "05.04.2026": [
    "rating-05-04-2026-league2-tournament-rebuy-14h.png",
    "rating-05-04-2026-league2-mok-mko-7max-21h.png",
    "rating-05-04-2026-league2-energetik-22h.png"
  ],
  "06.04.2026": [
    "rating-06-04-2026-league2-magic-bounty-60k-11h.png",
    "rating-06-04-2026-league2-bounty-200-70k-14h.png",
    "rating-06-04-2026-league2-plo4-25k-16h.png",
    "rating-06-04-2026-league2-energetik-22h.png"
  ],
  "07.04.2026": [
    "rating-07-04-2026-league2-magic-bounty-60k-11h.png",
    "rating-07-04-2026-league2-plo4-25k-16h.png",
    "rating-07-04-2026-league2-tournir-vtornika-18h.png"
  ],
  "08.04.2026": [
    "rating-08-04-2026-league2-deep-night-20k-02h.png",
    "rating-08-04-2026-league2-magic-bounty-60k-11h.png",
    "rating-08-04-2026-league2-plo4-25k-16h.png",
    "rating-08-04-2026-league2-tournir-sredy-18h.png",
    "rating-08-04-2026-league2-plo5-300-19h.png"
  ],
  "09.04.2026": [
    "rating-09-04-2026-league2-micro-200-70k-14h.png",
    "rating-09-04-2026-league2-mko-7max-21h.png"
  ],
  "10.04.2026": [
    "rating-10-04-2026-league2-xpoker-plo6-sarmat1305-rank3.jpg"
  ],
  "11.04.2026": [
    "rating-11-04-2026-league2-bali-yana-30k-08h.png",
    "rating-11-04-2026-league2-mko-7max-21h.png"
  ],
  "12.04.2026": [
    "rating-12-04-2026-league2-kg-plo6-09h.png",
    "rating-12-04-2026-league2-tournament-rebuy-14h.png",
    "rating-12-04-2026-league2-plo5-300-20h.png",
    "rating-12-04-2026-league2-mok-mko-7max-21h.png",
    "rating-12-04-2026-league2-energetik-22h.png"
  ],
  "13.04.2026": [
    "rating-13-04-2026-league2-kg-plo6-09h.png",
    "rating-13-04-2026-league2-magic-bounty-60k-11h.png",
    "rating-13-04-2026-league2-dv-rebuy-12h.png",
    "rating-13-04-2026-league2-bounty-200-70k-14h.png",
    "rating-13-04-2026-league2-hyper-turbo-300-20h.png",
    "rating-13-04-2026-league2-mko-7max-21h.png",
    "rating-13-04-2026-league2-energetik-22h.png"
  ],
  "14.04.2026": [
    "rating-14-04-2026-league2-tournir-vtornika-18h.png",
    "rating-14-04-2026-league2-mko-7max-21h.png",
    "rating-14-04-2026-league2-energetik-22h.png",
    "rating-14-04-2026-league2-hyper-turbo-300-20h.jpg"
  ],
  "15.04.2026": [
    "rating-15-04-2026-league2-tournir-sredy-18h.png",
    "rating-15-04-2026-league2-magic-bounty-50k-11h.jpg",
    "rating-15-04-2026-league2-hyper-turbo-300-20h.jpg",
    "rating-15-04-2026-league2-mko-7max-21h.png",
    "rating-15-04-2026-league2-energetik-22h.png"
  ],
  "16.04.2026": [
    "rating-16-04-2026-league2-kg-plo6-2d-09h.jpg",
    "rating-16-04-2026-league2-micro-200-50k-14h.jpg",
    "rating-16-04-2026-league2-plo4-20k-16h.jpg",
    "rating-16-04-2026-league2-mko-7max-21h.png",
    "rating-16-04-2026-league2-energetik-22h.png"
  ],
  "17.04.2026": [
    "rating-17-04-2026-league2-kg-plo6-2d-09h.jpg",
    "rating-17-04-2026-league2-dv-plo5-30k-12h.jpg",
    "rating-17-04-2026-league2-tournament-rebuy-14h.png",
    "rating-17-04-2026-league2-plo5-300-19h.jpg",
    "rating-17-04-2026-league2-hyper-turbo-300-20h.jpg",
    "rating-17-04-2026-league2-energetik-22h.png"
  ],
  "18.04.2026": [
    "rating-18-04-2026-league2-deep-night-15k-02h.jpg",
    "rating-18-04-2026-league2-magic-bounty-50k-11h.jpg",
    "rating-18-04-2026-league2-hyper-turbo-300-20h.jpg",
    "rating-18-04-2026-league2-plo4-20h.png",
    "rating-18-04-2026-league2-mko-7max-21h.png"
  ],
  "19.04.2026": [
    "rating-19-04-2026-league2-magic-bounty-50k-11h.jpg",
    "rating-19-04-2026-league2-plo4-20h.png",
    "rating-19-04-2026-league2-mko-7max-21h.png"
  ],
  "20.04.2026": [
    "rating-20-04-2026-league2-magic-bounty-50k-11h.jpg",
    "rating-20-04-2026-league2-plo5-300-19h.jpg",
    "rating-20-04-2026-league2-mko-7max-21h.png"
  ],
  "21.04.2026": [
    "rating-21-04-2026-league2-deep-night-15k-02h.jpg",
    "rating-21-04-2026-league2-kg-plo6-09h.jpg",
    "rating-21-04-2026-league2-micro-200-50k-14h.jpg",
    "rating-21-04-2026-league2-tournir-vtornika-18h.png",
    "rating-21-04-2026-league2-mko-7max-21h.png",
    "rating-21-04-2026-league2-xpoker-plo6-sarmat1305-rank3.jpg",
    "rating-21-04-2026-league2-xpoker-nlh-sarmat1305-rank7.jpg",
    "rating-21-04-2026-league2-xpoker-plo4-sarmat1305-rank4.jpg"
  ],
  "22.04.2026": [
    "rating-22-04-2026-league2-hyper-turbo-300-20h.jpg",
    "rating-22-04-2026-league2-tournir-sredy-18h.png"
  ],
  "23.04.2026": [
    "rating-23-04-2026-league2-micro-200-50k-14h.jpg",
    "rating-23-04-2026-league2-tournament-rebuy-14h.png",
    "rating-23-04-2026-league2-plo4-20h.png",
    "rating-23-04-2026-league2-mok-21h.png"
  ],
  "24.04.2026": [
    "rating-24-04-2026-league2-kg-plo6-09h.jpg",
    "rating-24-04-2026-league2-bounty-200-50k-14h.jpg",
    "rating-24-04-2026-league2-tournament-plo4-20h.jpg",
    "rating-24-04-2026-league2-mok-7max-21h.jpg"
  ],
  "25.04.2026": [
    "rating-25-04-2026-league2-tournament-rebuy-14h.jpg",
    "rating-25-04-2026-league2-mok-7max-21h.jpg"
  ],
  "26.04.2026": [
    "rating-26-04-2026-league2-mok-7max-21h.jpg"
  ]
};
var SPRING_RATING_UPDATED = "26 апреля";
var SPRING_RATING_TOURNAMENTS_BY_DATE = {
  "01.03.2026": [
    { time: "10:00", buyin: 500, players: [{ nick: "asianflushie", place: 0, reward: 4989 }] },
    { time: "11:00", buyin: 200, players: [{ nick: "Лёха", place: 0, reward: 939 }] },
    { time: "12:00", buyin: 19200, players: [{ nick: "FrankL", place: 1, reward: 17300 }, { nick: "ШАХИМАТ", place: 2, reward: 10360 }, { nick: "king00001", place: 3, reward: 6900 }, { nick: "Malek3084", place: 4, reward: 0 }, { nick: "Waaar", place: 13, reward: 0 }] },
    { time: "15:00", buyin: 500, players: [{ nick: "я автор", place: 4, reward: 1133 }] },
    { time: "18:00", buyin: 174000, players: [{ nick: "Waaar", place: 3, reward: 14200 }, { nick: "ПокерМанки", place: 4, reward: 58800 }, { nick: "@Felix", place: 5, reward: 58700 }, { nick: "nikola233", place: 6, reward: 12700 }, { nick: "Рамиль01fan", place: 7, reward: 7500 }, { nick: "Рыбнадзор", place: 0, reward: 1549 }, { nick: "XP3952131", place: 0, reward: 1252 }] },
    { time: "20:00", buyin: 50000, players: [{ nick: "Waaar", place: 1, reward: 37641 }, { nick: "F001", place: 5, reward: 5075 }, { nick: "ПокерМанки", place: 6, reward: 225 }, { nick: "JinDaniels", place: 7, reward: 2306 }, { nick: "WiNifly", place: 8, reward: 225 }] },
    { time: "21:00", buyin: 300, players: [{ nick: "Jkeyx", place: 2, reward: 8185 }, { nick: "TonniHalf", place: 3, reward: 1680 }, { nick: "WiNifly", place: 5, reward: 1230 }, { nick: "@Felix", place: 6, reward: 0 }, { nick: "ШЛЯПАУСАТ", place: 7, reward: 0 }] },
    { time: "21:00", buyin: 500, players: [{ nick: "Рыбнадзор", place: 0, reward: 5138 }, { nick: "comotd", place: 0, reward: 2622 }] },
    { time: "21:59", buyin: 500, players: [{ nick: "Откотика_Я", place: 0, reward: 9151 }, { nick: "MEVRIK", place: 0, reward: 4791 }] },
    { time: "22:00", buyin: 200, players: [{ nick: "XORTYRETSKOGO", place: 1, reward: 6400 }, { nick: "pitbulltip", place: 2, reward: 3830 }, { nick: "JinDaniels", place: 4, reward: 0 }, { nick: "ШЛЯПАУСАТ", place: 7, reward: 0 }, { nick: "Walker", place: 9, reward: 0 }] }
  ],
  "02.03.2026": [
    { time: "08:00", name: "Bali Yana 30k", buyin: 30000, players: [{ nick: "comotd", place: 2, reward: 2553 }, { nick: "Sukmanov1", place: 13, reward: 0 }, { nick: "nikola233", place: 0, reward: 0 }] },
    { time: "12:00", name: "DV Rebuy", buyin: 800, players: [{ nick: "|---777---|", place: 1, reward: 20800 }, { nick: "ПокерМанки", place: 2, reward: 14100 }, { nick: "FishKopcheny", place: 4, reward: 6700 }, { nick: "nikola233", place: 7, reward: 0 }, { nick: "Waaar", place: 8, reward: 0 }] },
    { time: "13:00", name: "DV Bounty 150k PKO", buyin: 10000, players: [{ nick: "АршакМкртчян", place: 8, reward: 6954 }, { nick: "NINT3NDO", place: 24, reward: 488 }, { nick: "Proxor", place: 0, reward: 0 }, { nick: "Monfokon", place: 0, reward: 0 }, { nick: "AndrushaMorf", place: 30, reward: 0 }] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 200, players: [{ nick: "FeraPont", place: 1, reward: 3970 }, { nick: "MiracleDivice", place: 2, reward: 2500 }, { nick: "Че643", place: 3, reward: 1710 }, { nick: "Shtill180", place: 5, reward: 1020 }, { nick: "VOSOvec", place: 7, reward: 0 }] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, players: [{ nick: "Рыбнадзор", place: 7, reward: 4944 }, { nick: "Откотика_Я", place: 13, reward: 2070 }, { nick: "Бабник", place: 0, reward: 0 }, { nick: "АршакМкртчян", place: 0, reward: 0 }, { nick: "Em13!!", place: 0, reward: 0 }] },
    { time: "17:00", name: "Rebuy MTT", buyin: 45600, players: [{ nick: "Nuts", place: 1, reward: 25900 }, { nick: "FishKopcheny", place: 2, reward: 17500 }, { nick: "FeraPont", place: 6, reward: 0 }, { nick: "king00001", place: 7, reward: 0 }, { nick: "Пряник", place: 8, reward: 0 }] },
    { time: "18:00", name: "Monday 250k GT", buyin: 5000, players: [{ nick: "АршакМкртчян", place: 9, reward: 6144 }, { nick: "Пряник", place: 26, reward: 936 }, { nick: "outsider", place: 171, reward: 0 }, { nick: "AndrushaMorf", place: 69, reward: 0 }, { nick: "Фокс", place: 113, reward: 0 }] },
    { time: "20:00", name: "HOK", buyin: 37000, players: [{ nick: "Waaar", place: 1, reward: 25275 }, { nick: "WiNifly", place: 2, reward: 14938 }, { nick: "|---777---|", place: 5, reward: 4697 }, { nick: "FrankL", place: 7, reward: 0 }, { nick: "FishKopcheny", place: 8, reward: 225 }] },
    { time: "21:00", name: "NLH KNOCKOUT 250k", buyin: 20000, players: [{ nick: "siropchik", place: 2, reward: 31575 }, { nick: "АршакМкртчян", place: 11, reward: 6974 }, { nick: "Waaarr", place: 19, reward: 1746 }, { nick: "Бабник", place: 0, reward: 0 }, { nick: "Пряник", place: 31, reward: 0 }] },
    { time: "21:00", name: "MOK", buyin: 300, players: [{ nick: "Аспирин", place: 1, reward: 10000 }, { nick: "Рамиль01fan", place: 2, reward: 9860 }, { nick: "pitbulltip", place: 3, reward: 4040 }, { nick: "Mier", place: 5, reward: 1480 }, { nick: "vitalyan088", place: 6, reward: 0 }] },
    { time: "22:00", name: "Energetik Tournament", buyin: 200, players: [{ nick: "Рамиль01fan", place: 1, reward: 6930 }, { nick: "Shkarubo", place: 2, reward: 4690 }, { nick: "ЧУРменя", place: 4, reward: 2240 }, { nick: "WiNifly", place: 5, reward: 2050 }, { nick: "|---777---|", place: 7, reward: 0 }] },
    { time: "22:00", name: "Magic", buyin: 500, players: [{ nick: "Proxor", place: 9, reward: 8818 }, { nick: "Рыбнадзор", place: 23, reward: 0 }, { nick: "AndrushaMorf", place: 65, reward: 0 }, { nick: "Бабник", place: 0, reward: 0 }, { nick: "АршакМкртчян", place: 0, reward: 0 }] }
  ],
  "03.03.2026": [
    { time: "00:00", name: "S.Bounty 2/3 150k", buyin: 10000, players: [{ nick: "Ярый", place: 1, reward: 77196 }, { nick: "Em13!!", place: 14, reward: 2673 }, { nick: "adiga666", place: 19, reward: 2196 }, { nick: "siropchik", place: 0, reward: 0 }, { nick: "АршакМкртчян", place: 0, reward: 0 }] },
    { time: "11:00", name: "Magic Bounty 60k", buyin: 300, players: [{ nick: "pryanik2la", place: 10, reward: 4109 }, { nick: "МВД", place: 19, reward: 0 }, { nick: "...Лёха...", place: 23, reward: 0 }, { nick: "Em13!!", place: 49, reward: 0 }, { nick: "XP3276334", place: 50, reward: 0 }] },
    { time: "16:00", name: "PLO4 25K", buyin: 100, players: [{ nick: "pryanik2la", place: 7, reward: 2795 }, { nick: "Sarmat1305", place: 18, reward: 0 }, { nick: "no_name", place: 32, reward: 0 }] },
    { time: "21:00", name: "MOK", buyin: 300, players: [{ nick: "Рамиль01fan", place: 3, reward: 7990 }, { nick: "51region", place: 4, reward: 1210 }, { nick: "$Denger$", place: 6, reward: 880 }, { nick: "lorg_777", place: 8, reward: 0 }, { nick: "Виктор", place: 9, reward: 0 }] },
    { time: "22:00", name: "Energetik Tournament", buyin: 200, players: [{ nick: "WiNifly", place: 2, reward: 3610 }, { nick: "Виктор", place: 8, reward: 0 }, { nick: "@Felix", place: 9, reward: 0 }, { nick: "cadillac", place: 14, reward: 0 }, { nick: "TonniHalf", place: 15, reward: 0 }] },
    { time: "12:00", name: "DV Rebuy", buyin: 800, players: [{ nick: "Waaar", place: 1, reward: 13900 }, { nick: "ПокерМанки", place: 2, reward: 9400 }, { nick: "FishKopcheny", place: 9, reward: 0 }, { nick: "FrankL", place: 10, reward: 0 }, { nick: "LuckyBoom", place: 15, reward: 0 }] },
    { time: "17:00", name: "Rebuy MTT", buyin: 28800, players: [{ nick: "Waaar", place: 1, reward: 23700 }, { nick: "Nuts", place: 2, reward: 14900 }, { nick: "Рамиль01fan", place: 3, reward: 10200 }, { nick: "Adam1993", place: 7, reward: 0 }, { nick: "|---777---|", place: 10, reward: 0 }] },
    { time: "18:00", name: "BOUNTY MAGIC", buyin: 10000, players: [{ nick: "Фокс", place: 5, reward: 44096 }, { nick: "Бабник", place: 0, reward: 0 }, { nick: "Waaarr", place: 125, reward: 0 }, { nick: "pryanik2la", place: 188, reward: 0 }, { nick: "Mougli", place: 0, reward: 0 }] },
    { time: "18:00", name: "Турнир Вторника", buyin: 60900, league: 2, players: [{ nick: "Виктор", place: 1, reward: 30300 }, { nick: "RnD-BuB", place: 3, reward: 9200 }, { nick: "kriak", place: 4, reward: 8100 }, { nick: "Палач", place: 6, reward: 5900 }, { nick: "ПокерМанки", place: 7, reward: 4500 }, { nick: "petroochoo", place: 9, reward: 2700 }, { nick: "Shkarubo", place: 12, reward: 1600 }, { nick: "XORTYRETSKOGO", place: 14, reward: 1600 }, { nick: "Аспирин", place: 15, reward: 1550 }, { nick: "Prokopenya", place: 16, reward: 1400 }, { nick: "Waaar", place: 19, reward: 1400 }, { nick: "PONOCHKA", place: 20, reward: 1400 }, { nick: "AliPetuhov", place: 21, reward: 1200 }, { nick: "konfesta", place: 34, reward: 0 }, { nick: "Бабник", place: 35, reward: 0 }] },
    { time: "20:00", name: "HOK", buyin: 39000, players: [{ nick: "Waaar", place: 4, reward: 7112 }, { nick: "@Felix", place: 12, reward: 2362 }, { nick: "ПокерМанки", place: 7, reward: 2025 }, { nick: "Mier", place: 22, reward: 450 }, { nick: "WiNifly", place: 10, reward: 450 }] },
    { time: "22:00", name: "Magic", buyin: 500, players: [{ nick: "АршакМкртчян", place: 7, reward: 11958 }, { nick: "kabanchik", place: 68, reward: 0 }, { nick: "Pe4enkA", place: 0, reward: 0 }, { nick: "Антон Ойнус", place: 0, reward: 0 }, { nick: "Бабник", place: 0, reward: 0 }] }
  ],
  "04.03.2026": [
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 20000, players: [{ nick: "nikola233", place: 3, reward: 5341 }, { nick: "Стифмастер", place: 4, reward: 0 }] },
    { time: "12:00", name: "DV Rebuy", buyin: 20000, players: [{ nick: "Pentagrammall", place: 3, reward: 7480 }, { nick: "Виктор", place: 4, reward: 5900 }, { nick: "|---777---|", place: 5, reward: 5400 }, { nick: "Waaar", place: 10, reward: 0 }, { nick: "FishKopcheny", place: 13, reward: 0 }] },
    { time: "13:00", name: "DV Bounty 150k", buyin: 100000, players: [{ nick: "NINT3NDO", place: 6, reward: 4095 }, { nick: "AndrushaMorf", place: 13, reward: 393 }, { nick: "Виталька", place: 0, reward: 0 }, { nick: "Стифмастер", place: 0, reward: 0 }, { nick: "АршакМкртчян", place: 42, reward: 0 }] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, players: [{ nick: "Em13!!", place: 3, reward: 9088 }, { nick: "Рыбнадзор", place: 12, reward: 0 }, { nick: "nikola233", place: 0, reward: 0 }, { nick: "Бабник", place: 0, reward: 0 }, { nick: "AndrushaMorf", place: 0, reward: 0 }] },
    { time: "15:00", name: "6+ HOLD'EM 500", buyin: 500, players: [{ nick: "AndrushaMorf", place: 3, reward: 2476 }, { nick: "Sarmat1305", place: 5, reward: 1085 }] },
    { time: "14:00", name: "Два туза. Доллары (FAST DEEP)", buyin: 0, league: 1, players: [{ nick: "Waaar", place: 3, points: 90, reward: 24610 }] },
    { time: "16:00", name: "PLO4 25K", buyin: 25000, league: 2, players: [{ nick: "МВД", place: 1, reward: 9629 }, { nick: "Maikun", place: 3, reward: 3417 }, { nick: "no_name", place: 8, reward: 1221 }, { nick: "АршакМкртчян", place: 0, reward: 0 }, { nick: "pryanik2la", place: 16, reward: 0 }] },
    { time: "17:00", name: "Rebuy", buyin: 36800, players: [{ nick: "WiNifly", place: 2, reward: 16300 }, { nick: "king00001", place: 4, reward: 7700 }, { nick: "ПокерМанки", place: 8, reward: 0 }, { nick: "Waaar", place: 9, reward: 0 }, { nick: "Nuts", place: 10, reward: 0 }] },
    { time: "20:00", name: "HOK", buyin: 71000, players: [{ nick: "TATAPUH058", place: 1, reward: 44359 }, { nick: "Rifa", place: 3, reward: 9088 }, { nick: "ПокерМанки", place: 4, reward: 9247 }, { nick: "|---777---|", place: 8, reward: 4444 }, { nick: "Waaar", place: 11, reward: 0 }] },
    { time: "18:00", name: "Freeroll 1 MLN", buyin: 1000000, players: [{ nick: "DzhalaLove", place: 18, reward: 7603 }, { nick: "Бабник", place: 20, reward: 6103 }, { nick: "Максим", place: 35, reward: 3650 }, { nick: "GalaKola", place: 48, reward: 3137 }, { nick: "pryanik2la", place: 65, reward: 923 }] },
    { time: "18:00", name: "Турнир Среды", buyin: 31600, league: 2, players: [{ nick: "Sergo$", place: 1, reward: 14680 }, { nick: "FishKopcheny", place: 3, reward: 4900 }, { nick: "TTK)", place: 4, reward: 3810 }, { nick: "zagrebnagreb", place: 5, reward: 3270 }, { nick: "Mr.V", place: 8, reward: 1310 }, { nick: "kriak", place: 9, reward: 930 }, { nick: "Аспирин", place: 11, reward: 650 }, { nick: "TonniHalf", place: 15, reward: 650 }, { nick: "SanDiego66", place: 16, reward: 570 }] },
    { time: "19:00", name: "WPLO5 300 MW", buyin: 300, league: 2, players: [{ nick: "Виктор", place: 4, reward: 2200 }, { nick: "adum777", place: 0, reward: 0 }, { nick: "undertaker", place: 0, reward: 0 }, { nick: "Sarmat1305", place: 8, reward: 0 }] },
    { time: "23:00", name: "Night magic 100K", buyin: 100000, players: [{ nick: "Фокс", place: 3, reward: 25267 }, { nick: "AndrushaMorf", place: 2, reward: 8743 }, { nick: "siropchik", place: 6, reward: 2442 }, { nick: "Рыбнадзор", place: 30, reward: 0 }, { nick: "Em13!!", place: 0, reward: 0 }] }
  ],
  "05.03.2026": [
    { time: "12:00", name: "DV Rebuy", buyin: 800, players: [{ nick: "king00001", place: 2, reward: 11580 }, { nick: "Waaar", place: 3, reward: 6900 }, { nick: "RUS22RUS", place: 4, reward: 5500 }, { nick: "MilkyWay77", place: 6, reward: 0 }, { nick: "Палач", place: 13, reward: 0 }] },
    { time: "17:00", name: "Rebuy MTT", buyin: 800, players: [{ nick: "king00001", place: 2, reward: 16980 }, { nick: "YOUAREMYDONKEY", place: 3, reward: 10100 }, { nick: "FrankL", place: 7, reward: 0 }, { nick: "ПокерМанки", place: 8, reward: 0 }, { nick: "Nuts", place: 10, reward: 0 }] },
    { time: "18:00", name: "Турнир Четверга", buyin: 1000, players: [{ nick: "FrankL", place: 1, reward: 48100 }, { nick: "Darkstorn", place: 4, reward: 8400 }, { nick: "Player2EBBB6", place: 7, reward: 17400 }, { nick: "Nuts", place: 14, reward: 1500 }, { nick: "@Felix", place: 15, reward: 1500 }] },
    { time: "20:00", name: "HOK MTT", buyin: 1000, players: [{ nick: "Рамиль01fan", place: 2, reward: 15387.5 }, { nick: "Waaar", place: 5, reward: 5550 }, { nick: "ZVIGENI", place: 8, reward: 1125 }, { nick: "Виктор", place: 9, reward: 2615.62 }, { nick: "FrankL", place: 10, reward: 450 }] },
    { time: "00:00", name: "S.Bounty 2/3 150k", buyin: 10000, players: [{ nick: "Рыбнадзор", place: 3, reward: 13552 }, { nick: "shockin", place: 4, reward: 12702 }, { nick: "AndrushaMorf", place: 0, reward: 150 }, { nick: "vvllaadd", place: 0, reward: 0 }, { nick: "Откотика_Я", place: 0, reward: 0 }] },
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 20000, players: [{ nick: "nikola233", place: 1, reward: 4830 }, { nick: "Фокс", place: 6, reward: 0 }, { nick: "Eroxarostov", place: 0, reward: 0 }] },
    { time: "10:00", name: "DV Turbo 500 90K", buyin: 500, players: [{ nick: "AndrushaMorf", place: 1, reward: 36710 }, { nick: "АршакМкртчян", place: 0, reward: 0 }, { nick: "nikola233", place: 0, reward: 0 }, { nick: "Ярый", place: 0, reward: 0 }, { nick: "Em13!!", place: 69, reward: 0 }] },
    { time: "13:00", name: "DV Bounty 150k", buyin: 10000, players: [{ nick: "siropchik", place: 13, reward: 3017 }, { nick: "АршакМкртчян", place: 22, reward: 756 }, { nick: "Бабник", place: 10, reward: 304 }, { nick: "nikola233", place: 0, reward: 0 }, { nick: "NINT3NDO", place: 0, reward: 0 }] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, players: [{ nick: "Рыбнадзор", place: 2, reward: 10599 }, { nick: "АршакМкртчян", place: 16, reward: 2070 }, { nick: "Бабник", place: 0, reward: 0 }, { nick: "nikola233", place: 0, reward: 0 }, { nick: "Em13!!", place: 13, reward: 0 }] },
    { time: "18:00", name: "SHR 175$ - 2/3 PKO", buyin: 17500, players: [{ nick: "pryanik2la", place: 12, reward: 17718 }] },
    { time: "18:00", name: "PLO5 - PKO 200k", buyin: 25000, players: [{ nick: "UnLucky'(", place: 6, reward: 8059 }, { nick: "siropchik", place: 0, reward: 0 }, { nick: "nikola233", place: 0, reward: 0 }, { nick: "no_name", place: 45, reward: 0 }, { nick: "XP3349402", place: 0, reward: 0 }] },
    { time: "21:00", name: "NLH KNOCKOUT 250k", buyin: 20000, players: [{ nick: "ОДИН", place: 2, reward: 39387 }, { nick: "siropchik", place: 5, reward: 15695 }, { nick: "Рыбнадзор", place: 15, reward: 5378 }, { nick: "no_name", place: 16, reward: 2725 }, { nick: "n1kk1ex", place: 58, reward: 1600 }] },
    { time: "14:00", name: "Micro 200 70K GTD", buyin: 200, league: 2, players: [{ nick: "Бабник", place: 2, reward: 13453 }, { nick: "liayul", place: 0, reward: 0 }, { nick: "Julia Shish", place: 0, reward: 0 }, { nick: "EnotSimuran", place: 0, reward: 0 }, { nick: "ABevege", place: 0, reward: 0 }] },
    { time: "21:00", name: "MOK MTT", buyin: 21900, league: 2, players: [{ nick: "Player2EBBB6", place: 1, reward: 16745 }, { nick: "Виктор", place: 3, reward: 3400 }, { nick: "Shkarubo", place: 5, reward: 1270 }, { nick: "Рамиль01fan", place: 7, reward: 0 }, { nick: "MiracleDivice", place: 8, reward: 0 }] },
    { time: "20:00", name: "Hyper Turbo 300", buyin: 300, league: 1, players: [{ nick: "AlenaSt", place: 1, reward: 20659 }, { nick: "Рыбнадзор", place: 0, reward: 0 }, { nick: "MEVRIK", place: 0, reward: 0 }, { nick: "Фокс", place: 0, reward: 0 }] }
  ],
  "06.03.2026": [
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 200, league: 2, players: [{ nick: "undertaker", place: 5, points: 60, reward: 2103 }] },
    { time: "10:00", name: "DV Turbo 500 90K", buyin: 10000, league: 1, players: [{ nick: "Фокс", place: 2, points: 110, reward: 24281 }, { nick: "Em13!!", place: 14, points: 0, reward: 1059 }, { nick: "asianflushie", place: 17, points: 0, reward: 920 }] },
    { time: "12:00", name: "DV Rebuy", buyin: 18400, players: [{ nick: "FrankL", place: 2, points: 110, reward: 9400 }, { nick: "ZVIGENI", place: 7, points: 0, reward: 0 }, { nick: "|---777---|", place: 9, points: 0, reward: 0 }, { nick: "MilkyWay77", place: 10, points: 0, reward: 0 }, { nick: "stafart", place: 14, points: 0, reward: 0 }] },
    { time: "14:00", name: "Bounty 200€ 70K GTD", buyin: 10000, league: 2, players: [{ nick: "Виктор", place: 2, points: 110, reward: 7075 }, { nick: "Asta002", place: 20, points: 0, reward: 1498 }] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [{ nick: "Рыбнадзор", place: 1, points: 135, reward: 22782 }] },
    { time: "17:00", name: "Rebuy MTT", buyin: 25600, players: [{ nick: "m0l4yH", place: 1, points: 135, reward: 22200 }, { nick: "king00001", place: 6, points: 0, reward: 0 }, { nick: "Nuts", place: 9, points: 0, reward: 0 }, { nick: "ПокерМанки", place: 12, points: 0, reward: 0 }, { nick: "Waaar", place: 14, points: 0, reward: 0 }] },
    { time: "18:00", name: "NLH Bounty 400K", buyin: 20000, league: 1, players: [{ nick: "kream89", place: 3, points: 90, reward: 38511 }, { nick: "Proxor", place: 8, points: 50, reward: 8497 }, { nick: "Darkstorn", place: 18, points: 0, reward: 2376 }] },
    { time: "18:00", name: "Пятница Прогрессив", buyin: 98500, players: [{ nick: "Witch", place: 3, points: 90, reward: 15003.44 }, { nick: "Аспирин", place: 5, points: 60, reward: 5466.25 }, { nick: "maniakk", place: 7, points: 50, reward: 5302.19 }, { nick: "kriak", place: 8, points: 50, reward: 2816.21 }, { nick: "AlenaSt", place: 9, points: 50, reward: 1777.19 }] },
    { time: "20:00", name: "HOK Magic", buyin: 28000, players: [{ nick: "Rifa", place: 3, points: 90, reward: 6000 }, { nick: "|---777---|", place: 4, points: 70, reward: 4500 }, { nick: "MORPEH", place: 7, points: 0, reward: 0 }, { nick: "simba", place: 11, points: 0, reward: 0 }, { nick: "ПокерМанки", place: 12, points: 0, reward: 0 }] },
    { time: "21:00", name: "MKO 7MAX MTT-NLH", buyin: 12600, league: 2, players: [{ nick: "$Denger$", place: 4, reward: 1275 }, { nick: "Виктор", place: 5, reward: 1170 }, { nick: "Player2EBBB6", place: 7, reward: 0 }, { nick: "loko21rus", place: 11, reward: 0 }, { nick: "m014yH", place: 12, reward: 0 }] },
    { time: "22:00", name: "Energetik Tournament", buyin: 13200, league: 2, players: [{ nick: "Аспирин", place: 2, reward: 5400 }, { nick: "Tanechka", place: 3, reward: 3240 }, { nick: "loko21rus", place: 4, reward: 2590 }, { nick: "|---777---|", place: 6, reward: 0 }, { nick: "tatarin_1", place: 7, reward: 0 }] },
    { time: "22:00", name: "Magic", buyin: 500, league: 1, players: [{ nick: "siropchik", place: 2, points: 110, reward: 25764 }, { nick: "AndrushaMorf", place: 5, points: 60, reward: 8593 }, { nick: "ОДИН", place: 21, points: 0, reward: 4625 }] }
  ],
  "07.03.2026": [
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 10000, league: 1, players: [
      { nick: "AndrushaMorf", place: 1, reward: 31.15 }
    ] },
    { time: "00:00", name: "S.Bounty 2/3 150k", buyin: 20000, league: 1, players: [{ nick: "siropchik", place: 16, points: 0, reward: 2100 }] },
    { time: "08:00", name: "Bali Yana 🌴 NEW 30k", buyin: 10000, league: 1, players: [{ nick: "хер вам)))))", place: 2, points: 110, reward: 6439 }, { nick: "AndrushaMorf", place: 8, points: 0, reward: 0 }, { nick: "ОДИН", place: 0, points: 0, reward: 0 }] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 200, league: 2, players: [{ nick: "Sarmat1305", place: 1, points: 135, reward: 7979 }, { nick: "UnLucky'(+", place: 3, points: 90, reward: 1802 }, { nick: "pryanik2la", place: 6, points: 50, reward: 264 }] },
    { time: "11:00", name: "Magic Bounty 60k", buyin: 10000, league: 2, players: [{ nick: "Olegan393", place: 3, points: 90, reward: 6302 }, { nick: "n1kk1ex", place: 14, points: 0, reward: 5473 }] },
    { time: "12:00", name: "DV Rebuy", buyin: 16000, players: [{ nick: "FrankL", place: 2, points: 110, reward: 11000 }, { nick: "|---777---|", place: 7, points: 0, reward: 0 }, { nick: "king00001", place: 8, points: 0, reward: 0 }, { nick: "Waaar", place: 9, points: 0, reward: 0 }, { nick: "HEADSHOT", place: 18, points: 0, reward: 0 }] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [{ nick: "Бабник", place: 2, points: 110, reward: 8599 }, { nick: "хер вам)))))", place: 5, points: 60, reward: 2271 }, { nick: "n1kk1ex", place: 4, points: 70, reward: 12150 }] },
    { time: "17:00", name: "Rebuy", buyin: 28000, players: [{ nick: "FrankL", place: 1, points: 135, reward: 22200 }, { nick: "Waaar", place: 3, points: 90, reward: 9000 }, { nick: "king00001", place: 4, points: 70, reward: 7200 }, { nick: "pokerAdmin", place: 9, points: 0, reward: 0 }, { nick: "Палач", place: 14, points: 0, reward: 0 }] },
    { time: "20:00", name: "НОК", buyin: 39000, players: [{ nick: "king00001", place: 2, points: 110, reward: 10137.5 }, { nick: "@Felix", place: 7, points: 50, reward: 2025 }, { nick: "Waaar", place: 8, points: 50, reward: 675 }, { nick: "Rifa", place: 9, points: 50, reward: 956.25 }, { nick: "|---777---|", place: 11, points: 0, reward: 450 }] },
    { time: "16:00", name: "PLO4 25K", buyin: 10000, league: 2, players: [{ nick: "asianflushie", place: 1, points: 135, reward: 5643 }] },
    { time: "19:00", name: "PLO4 PKO 30K", buyin: 10000, league: 2, players: [{ nick: "Sarmat1305", place: 2, points: 110, reward: 4810 }] },
    { time: "18:00", name: "LUCKY 777 GTD", buyin: 100, league: 1, players: [{ nick: "Waaarr", place: 34, points: 0, reward: 2459 }] },
    { time: "21:00", name: "NLH KNOCKOUT 250k", buyin: 100, league: 1, players: [{ nick: "AndrushaMorf", place: 23, points: 0, reward: 6348 }, { nick: "МВД", place: 17, points: 0, reward: 4973 }, { nick: "хер вам)))))", place: 57, points: 0, reward: 350 }] },
    { time: "21:00", name: "MOK", buyin: 11700, league: 2, players: [{ nick: "Jkeyx", place: 3, reward: 1155 }, { nick: "Tanechka", place: 4, reward: 920 }, { nick: "tatarin_1", place: 6, reward: 0 }, { nick: "TonniHalf", place: 8, reward: 0 }, { nick: "ПаПа_Мо}|{еТ", place: 9, reward: 0 }] },
    { time: "22:00", name: "Magic", buyin: 500, league: 1, players: [{ nick: "Mougli", place: 5, points: 60, reward: 10692 }, { nick: "Грек777", place: 30, points: 0, reward: 28 }] },
    { time: "18:00", name: "SUPER SATURDAY", buyin: 0, league: 1, players: [{ nick: "Waaar", place: 6, points: 50, reward: 30475 }] }
  ],
  "08.03.2026": [
    { time: "02:00", name: "Deep Night 20k", buyin: 10000, league: 2, players: [
      { nick: "Olegan393", place: 5, reward: 1620 }
    ] },
    { time: "20:00", name: "HOK", buyin: 1000, league: 1, players: [
      { nick: "Waaar", place: 4, reward: 4948.44 },
      { nick: "|---777---|", place: 7, reward: 337.5 },
      { nick: "nerrielle", place: 9, reward: 0 },
      { nick: "@Felix", place: 11, reward: 1575 },
      { nick: "konfesta", place: 12, reward: 1181.25 }
    ] },
    { time: "18:00", name: "Воскресный турнир MKO 7MAX", buyin: 2000, league: 1, players: [
      { nick: "Rifa", place: 1, reward: 88000 },
      { nick: "king00001", place: 5, reward: 10100 },
      { nick: "Waaar", place: 6, reward: 8800 },
      { nick: "ПокерМанки", place: 9, reward: 4700 },
      { nick: "IRIHKA", place: 14, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 800, league: 1, players: [
      { nick: "Рамиль01fan", place: 2, reward: 15000 },
      { nick: "Nuts", place: 4, reward: 7200 },
      { nick: "FrankL", place: 5, reward: 6600 },
      { nick: "Sarmat1305", place: 6, reward: 0 },
      { nick: "king00001", place: 7, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "хер вам)))", place: 4, reward: 5838 }
    ] },
    { time: "00:00", name: "S.Bounty 2/3 150k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 5, reward: 8072 },
      { nick: "Бабник", place: 14, reward: 2658 }
    ] },
    { time: "13:00", name: "DV MAIN 1MLN", buyin: 20000, league: 1, players: [
      { nick: "XP3952131", place: 0, reward: 22101 },
      { nick: "Sarmat1305", place: 41, reward: 1992 },
      { nick: "NINT3NDO", place: 26, reward: 1776 }
    ] },
    { time: "18:00", name: "MAIN 2.5M GTD", buyin: 500, league: 1, players: [
      { nick: "Waaaar", place: 6, reward: 109958 }
    ] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 100, league: 2, players: [
      { nick: "Аспирин", place: 3, reward: 1500 },
      { nick: "DirtyFox", place: 7, reward: 0 },
      { nick: "AlenaSt", place: 8, reward: 0 },
      { nick: "Prushnik", place: 16, reward: 0 },
      { nick: "Volga21", place: 18, reward: 0 }
    ] },
    { time: "22:00", name: "Energetik Tournament", buyin: 200, league: 2, players: [
      { nick: "Shkarubo", place: 1, reward: 6400 },
      { nick: "Ksuha🐍", place: 4, reward: 2070 },
      { nick: "AlenaSt", place: 5, reward: 1900 },
      { nick: "Аспирин", place: 9, reward: 0 },
      { nick: "viktor200688", place: 12, reward: 0 }
    ] }
  ],
  "09.03.2026": [
    { time: "10:00", name: "DV Turbo 500 90K", buyin: 10000, league: 1, players: [
      { nick: "Откотика_Я", place: 3, reward: 20685 }
    ] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 20000, league: 1, players: [
      { nick: "Sukmanov1", place: 2, reward: 5005 }
    ] },
    { time: "13:00", name: "DV 🦅 Bounty 🥊 150k", buyin: 10000, league: 1, players: [
      { nick: "Фокс", place: 5, reward: 7892 },
      { nick: "Sukmanov1", place: 27, reward: 743 }
    ] },
    { time: "18:00", name: "Monday 250k GT", buyin: 5000, league: 1, players: [
      { nick: "Waaaar", place: 6, reward: 2793 },
      { nick: "AndrushaMorf", place: 17, reward: 1345 }
    ] },
    { time: "23:00", name: "Night magic 100K", buyin: 20000, league: 1, players: [
      { nick: "хер вам)))", place: 5, reward: 3432 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 800, league: 1, players: [
      { nick: "|---777---|", place: 4, reward: 9120 },
      { nick: "ПокерМанки", place: 5, reward: 8300 },
      { nick: "Rifa", place: 6, reward: 0 },
      { nick: "AliPetuhov", place: 11, reward: 0 },
      { nick: "FrankL", place: 13, reward: 0 }
    ] },
    { time: "20:00", name: "HOK", buyin: 1000, league: 1, players: [
      { nick: "ПокерМанки", place: 3, reward: 6462.5 },
      { nick: "Waaar", place: 5, reward: 6187.5 },
      { nick: "king00001", place: 7, reward: 1462.5 },
      { nick: "<Amaliya>", place: 9, reward: 675 },
      { nick: "Rifa", place: 11, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Понедельника MKO 7MAX", buyin: 500, league: 1, players: [
      { nick: "Prushnik", place: 1, reward: 39750 },
      { nick: "Malek3084", place: 3, reward: 13940 },
      { nick: "Аспирин", place: 5, reward: 4350 },
      { nick: "\"ЗараЗа\"", place: 6, reward: 5740 },
      { nick: "Baldendi", place: 8, reward: 1940 }
    ] },
    { time: "22:00", name: "Energetik Tournament", buyin: 200, league: 2, players: [
      { nick: "Рамиль01fan", place: 4, reward: 2520 },
      { nick: "VOSOvec", place: 5, reward: 2310 },
      { nick: "Ronn", place: 6, reward: 0 },
      { nick: "Malek3084", place: 8, reward: 0 },
      { nick: "$M$Э$P$", place: 9, reward: 0 }
    ] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 100, league: 2, players: [
      { nick: "Shkarubo", place: 3, reward: 1930 },
      { nick: "Ksuha🐍", place: 5, reward: 1410 },
      { nick: "m0l4yH", place: 6, reward: 0 },
      { nick: "Borsoi", place: 7, reward: 0 },
      { nick: "YOUAREMYDONKEY", place: 8, reward: 0 }
    ] }
  ],
  "10.03.2026": [
    { time: "12:00", name: "DV Rebuy", buyin: 19200, league: 1, players: [{ nick: "Waaar", place: 1, reward: 19900 }, { nick: "Dins", place: 2, reward: 11800 }, { nick: "|---777---|", place: 10, reward: 0 }, { nick: "FrankL", place: 11, reward: 0 }, { nick: "Рамиль01fan", place: 14, reward: 0 }] },
    { time: "17:00", name: "Rebuy MTT", buyin: 24000, league: 1, players: [{ nick: "WiNifly", place: 4, reward: 7200 }, { nick: "MilkyWay77", place: 7, reward: 0 }, { nick: "Waaar", place: 8, reward: 0 }, { nick: "king00001", place: 13, reward: 0 }, { nick: "|---777---|", place: 15, reward: 0 }] },
    { time: "20:00", name: "HOK Magic", buyin: 24000, league: 1, players: [{ nick: "Waaar", place: 2, reward: 11100 }, { nick: "ПокерМанки", place: 3, reward: 5600 }, { nick: "king00001", place: 4, reward: 4100 }, { nick: "<Amaliya>", place: 8, reward: 0 }, { nick: "|---777---|", place: 14, reward: 0 }] },
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 10000, league: 1, players: [{ nick: "хер вам)))))", place: 1, reward: 4795 }, { nick: "mistik38", place: 0, reward: 0 }, { nick: "nikola233", place: 0, reward: 0 }] },
    { time: "21:00", name: "NLH KNOCKOUT 250k", buyin: 20000, league: 1, players: [{ nick: "Lorenco", place: 14, reward: 3139 }, { nick: "mr.Freeman", place: 35, reward: 1250 }, { nick: "Бабник", place: 54, reward: 0 }, { nick: "Waaarr", place: 55, reward: 0 }, { nick: "siropchik", place: 0, reward: 0 }] },
    { time: "22:00", name: "Magic", buyin: 500, league: 1, players: [{ nick: "shockin", place: 4, reward: 22231 }, { nick: "Откотика_Я", place: 5, reward: 5964 }, { nick: "nikola233", place: 28, reward: 508 }, { nick: "doctor43", place: 0, reward: 0 }, { nick: "siropchik", place: 0, reward: 0 }] },
    { time: "23:00", name: "Night magic 100K", buyin: 20000, league: 1, players: [{ nick: "Фокс", place: 4, reward: 3989 }, { nick: "nikola233", place: 0, reward: 0 }, { nick: "Владимир", place: 0, reward: 0 }, { nick: "Proxor", place: 0, reward: 0 }, { nick: "shockin", place: 22, reward: 0 }] },
    { time: "18:00", name: "Турнир Вторника", buyin: 63900, league: 2, players: [{ nick: "@Felix", place: 3, reward: 9400 }, { nick: "Waaar", place: 5, reward: 7100 }, { nick: "AlenaSt", place: 7, reward: 4600 }, { nick: "Рамиль01fan", place: 8, reward: 3100 }, { nick: "Baldendi", place: 9, reward: 2800 }] },
    { time: "11:00", name: "Magic Bounty 60k", buyin: 60000, league: 2, players: [{ nick: "...Лёха...", place: 1, reward: 21385 }, { nick: "АршакМкртчян", place: 23, reward: 227 }, { nick: "AlenaSt", place: 25, reward: 0 }, { nick: "mistik38", place: 0, reward: 0 }, { nick: "PROFESSOR", place: 52, reward: 0 }] },
    { time: "14:00", name: "Micro 200 🏆 70K GTD", buyin: 200, league: 2, players: [{ nick: "AlenaSt", place: 4, reward: 5756 }, { nick: "n1kk1ex", place: 18, reward: 558 }, { nick: "godzi888", place: 0, reward: 0 }, { nick: "asianflushie", place: 0, reward: 0 }, { nick: "outsider", place: 101, reward: 0 }] }
  ],
  "11.03.2026": [
    { time: "00:00", name: "S.Bounty 2/3 150k", buyin: 10000, league: 1, players: [{ nick: "nikola233", place: 3, reward: 9300 }, { nick: "Ярый", place: 6, reward: 8917 }, { nick: "Бабник", place: 9, reward: 6219 }, { nick: "Proxor", place: 0, reward: 0 }, { nick: "mr.Freeman", place: 0, reward: 0 }] },
    { time: "12:00", name: "DV Rebuy", buyin: 17600, league: 1, players: [{ nick: "WB@._", place: 5, reward: 5600 }, { nick: "ПокерМанки", place: 6, reward: 0 }, { nick: "king00001", place: 13, reward: 0 }, { nick: "FrankL", place: 14, reward: 0 }, { nick: "ZVIGENI", place: 16, reward: 0 }] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [{ nick: "Em13!!", place: 4, reward: 2671 }, { nick: "nikola233", place: 5, reward: 1909 }] },
    { time: "17:00", name: "Rebuy MTT", buyin: 5600, league: 1, players: [{ nick: "Евгений", place: 1, reward: 30000 }, { nick: "king00001", place: 10, reward: 0 }, { nick: "|---777---|", place: 15, reward: 0 }, { nick: "ZVIGENI", place: 18, reward: 0 }] },
    { time: "20:00", name: "HOK MTT", buyin: 40000, league: 1, players: [{ nick: "@Felix", place: 7, reward: 2025 }, { nick: "Waaar", place: 9, reward: 900 }, { nick: "Rifa", place: 10, reward: 1125 }, { nick: "king00001", place: 11, reward: 1800 }, { nick: "Adam1993", place: 16, reward: 225 }] },
    { time: "21:00", name: "NLH KNOCKOUT 250k", buyin: 20000, league: 1, players: [{ nick: "Бабник", place: 1, reward: 41795 }, { nick: "АршакМкртчян", place: 21, reward: 2519 }, { nick: "chazyiool", place: 28, reward: 2450 }, { nick: "odna.pluha", place: 0, reward: 0 }, { nick: "siropchik", place: 0, reward: 0 }] },
    { time: "18:00", name: "Турнир Среды", buyin: 26000, league: 2, players: [{ nick: "Tanechka", place: 4, reward: 3650 }, { nick: "tatarin_1", place: 5, reward: 3150 }, { nick: "Shkarubo", place: 8, reward: 1500 }, { nick: "XORTYRETSKOGO", place: 12, reward: 850 }, { nick: "DmQa", place: 13, reward: 850 }] },
    { time: "22:00", name: "Energetik Tournament", buyin: 8000, league: 2, players: [{ nick: "XORTYRETSKOGO", place: 2, reward: 3920 }, { nick: "Prokopenya", place: 5, reward: 1720 }, { nick: "Tanechka", place: 9, reward: 0 }, { nick: "Аспирин", place: 13, reward: 0 }, { nick: "Чеб43", place: 15, reward: 0 }] },
    { time: "16:00", name: "PLO4 25K", buyin: 25000, league: 2, players: [{ nick: "Sarmat1305", place: 1, reward: 9818 }, { nick: "МВД", place: 37, reward: 0 }] },
    { time: "19:00", name: "PLO5 300", buyin: 300, league: 2, players: [{ nick: "Sarmat1305", place: 2, reward: 6183 }] }
  ],
  "12.03.2026": [
    { time: "12:00", name: "DV Rebuy", buyin: 800, league: 1, players: [{ nick: "ПокерМанки", place: 3, reward: 10400 }, { nick: "WB@._", place: 5, reward: 7600 }, { nick: "Mr.V", place: 7, reward: 0 }, { nick: "Waaar", place: 8, reward: 0 }, { nick: "king00001", place: 11, reward: 0 }] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 10000, league: 1, players: [{ nick: "Sarmat1305", place: 1, reward: 17100 }] },
    { time: "13:00", name: "DV Bounty 150k", buyin: 10000, league: 1, players: [{ nick: "Бабник", place: 2, reward: 23200 }, { nick: "NINT3NDO", place: 45, reward: 100 }, { nick: "АршакМкртчян", place: 0, reward: 0 }, { nick: "Em13!!", place: 0, reward: 0 }, { nick: "Proxor", place: 0, reward: 0 }] },
    { time: "14:00", name: "Micro 200 70K GTD", buyin: 200, league: 2, players: [{ nick: "outsider", place: 3, reward: 15000 }, { nick: "Откотика_Я", place: 24, reward: 635 }, { nick: "БЕРКУТ", place: 30, reward: 590 }, { nick: "Ферапонт", place: 39, reward: 0 }, { nick: "PONOCHKA43", place: 65, reward: 0 }] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [{ nick: "Em13!!", place: 6, reward: 200 }, { nick: "AndrushaMorf", place: 19, reward: 0 }, { nick: "АршакМкртчян", place: 0, reward: 0 }, { nick: "NINT3NDO", place: 0, reward: 0 }] },
    { time: "16:00", name: "HOLDEM 6+ GTD 40K", buyin: 10000, league: 1, players: [{ nick: "Sarmat1305", place: 3, reward: 7000 }] },
    { time: "18:00", name: "Турнир Четверга", buyin: 1000, league: 1, players: [{ nick: "TonniHalf", place: 2, reward: 23200 }, { nick: "Rifa", place: 3, reward: 24050 }, { nick: "|---777---|", place: 5, reward: 54100 }, { nick: "VICTORINOX", place: 6, reward: 15200 }, { nick: "FanatCoo1era", place: 9, reward: 3300 }] },
    { time: "20:00", name: "HOK", buyin: 40000, league: 1, players: [{ nick: "Аспирин", place: 2, reward: 17792 }, { nick: "ПокерМанки", place: 4, reward: 10823 }, { nick: "king00001", place: 6, reward: 0 }, { nick: "Waaar", place: 9, reward: 2025 }, { nick: "WiNifly", place: 11, reward: 0 }] },
    { time: "21:00", name: "MOK", buyin: 8400, league: 2, players: [{ nick: "VOSOvec", place: 1, reward: 13320 }, { nick: "ZVIGENI", place: 2, reward: 2440 }, { nick: "Prokopenya", place: 5, reward: 1060 }, { nick: "tatarin_1", place: 7, reward: 0 }, { nick: "51region", place: 8, reward: 0 }] }
  ],
  "13.03.2026": [
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 20000, league: 1, players: [{ nick: "ArsenalFan", place: 2, reward: 8000 }, { nick: "nikola233", place: 0, reward: 0 }] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 7900, league: 2, players: [{ nick: "Shkarubo", place: 2, reward: 3110 }, { nick: "Че643", place: 3, reward: 1860 }, { nick: "Tanechka", place: 4, reward: 1490 }, { nick: "mr.Fox", place: 5, reward: 1360 }, { nick: "MiracleDivice", place: 6, reward: 0 }] },
    { time: "17:00", name: "Rebuy MTT", buyin: 28000, league: 1, players: [{ nick: "MilkyWay77", place: 1, reward: 22200 }, { nick: "|---777---|", place: 2, reward: 15000 }, { nick: "FrankL", place: 3, reward: 9000 }, { nick: "Vaduxa_tiran", place: 5, reward: 6600 }, { nick: "king00001", place: 6, reward: 0 }] },
    { time: "18:00", name: "Пятница Прогрессив", buyin: 91500, league: 1, players: [{ nick: "TonniHalf", place: 1, reward: 41968.72 }, { nick: "Malek3084", place: 2, reward: 13851.56 }, { nick: "Аспирин", place: 4, reward: 9277.96 }, { nick: "Waaar", place: 5, reward: 7100.62 }, { nick: "Samy", place: 7, reward: 4830.61 }] },
    { time: "18:00", name: "NLH Bounty 400K", buyin: 20000, league: 1, players: [{ nick: "Waaarr", place: 5, reward: 21428 }, { nick: "machete", place: 0, reward: 349 }, { nick: "siropchik", place: 31, reward: 212 }, { nick: "Bota007", place: 0, reward: 0 }, { nick: "Asta la Vista", place: 113, reward: 0 }] },
    { time: "20:00", name: "Hyper Turbo 300", buyin: 300, league: 2, players: [{ nick: "Sarmat1305", place: 4, reward: 7791 }, { nick: "allex 1983", place: 27, reward: 550 }, { nick: "Стифмастер", place: 0, reward: 0 }, { nick: "Бабник", place: 0, reward: 0 }, { nick: "cheb43", place: 42, reward: 0 }] },
    { time: "21:00", name: "MOK MTT", buyin: 18000, league: 2, players: [{ nick: "Грек777", place: 2, reward: 6010 }, { nick: "PlayerHyeEr", place: 4, reward: 1160 }, { nick: "DiagPro161", place: 5, reward: 940 }, { nick: "Mr.V", place: 6, reward: 840 }, { nick: "Prokopenya", place: 7, reward: 0 }] },
    { time: "23:00", name: "Night magic 100K", buyin: 100000, league: 1, players: [{ nick: "nikola233", place: 3, reward: 9276 }, { nick: "siropchik", place: 9, reward: 1628 }, { nick: "Фокс", place: 11, reward: 0 }, { nick: "nachyn", place: 0, reward: 0 }, { nick: "Asta la Vista", place: 0, reward: 0 }] }
  ],
  "14.03.2026": [
    { time: "02:00", name: "Deep Night 20k", buyin: 200, league: 2, players: [{ nick: "Leokampus", place: 3, reward: 3128 }, { nick: "Olegan393", place: 6, reward: 1202 }, { nick: "NeSkromnii Samui", place: 0, reward: 0 }, { nick: "augustrdgr", place: 0, reward: 0 }] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 200, league: 2, players: [{ nick: "nikola233", place: 8, reward: 206 }, { nick: "PROFESSOR", place: 0, reward: 0 }] },
    { time: "10:00", name: "DV Turbo 500 90K", buyin: 500, league: 1, players: [{ nick: "Фокс", place: 3, reward: 8438 }, { nick: "ДомСоветов", place: 0, reward: 0 }, { nick: "АршакМкртчян", place: 0, reward: 0 }, { nick: "Olegan393", place: 0, reward: 0 }, { nick: "AndrushaMorf", place: 31, reward: 0 }] },
    { time: "12:00", name: "DV Rebuy", buyin: 23200, league: 1, players: [{ nick: "Waaar", place: 1, reward: 16600 }, { nick: "FrankL", place: 8, reward: 0 }, { nick: "Aigulchik", place: 9, reward: 0 }, { nick: "WB@._", place: 11, reward: 0 }, { nick: "Malek3084", place: 14, reward: 0 }] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 300, league: 2, players: [{ nick: "PROFESSOR", place: 2, reward: 5880 }, { nick: "nikola233", place: 0, reward: 0 }] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 6900, league: 2, players: [{ nick: "mr.Fox", place: 2, reward: 2070 }, { nick: "AlenaSt", place: 3, reward: 1240 }, { nick: "Shkarubo", place: 4, reward: 990 }, { nick: "Анубис", place: 6, reward: 0 }, { nick: "Аспирин", place: 7, reward: 0 }] },
    { time: "16:00", name: "PLO4 25K", buyin: 25000, league: 1, players: [{ nick: "PROFESSOR", place: 1, reward: 7863 }, { nick: "allex 1983", place: 2, reward: 4292 }, { nick: "Serebrennaya", place: 9, reward: 255 }, { nick: "no_name", place: 0, reward: 0 }] },
    { time: "18:00", name: "LUCKY 777 GTD", buyin: 500, league: 1, players: [{ nick: "Waaarr", place: 5, reward: 11615 }, { nick: "AKARMARA", place: 0, reward: 0 }, { nick: "A_AJoKeR", place: 0, reward: 0 }, { nick: "siropchik", place: 0, reward: 0 }, { nick: "XP3349402", place: 62, reward: 0 }] },
    { time: "18:00", name: "Субботний Фриролл", buyin: 82000, league: 1, noPoints: true, players: [{ nick: "mamalena", place: 2, reward: 21010 }, { nick: "techno", place: 3, reward: 13210 }, { nick: "ПокерМанки", place: 5, reward: 8710 }, { nick: "TonniHalf", place: 7, reward: 4660 }, { nick: "набутылкин", place: 8, reward: 3160 }] },
    { time: "20:00", name: "HOK Magic", buyin: 35000, league: 1, players: [{ nick: "Waaar", place: 1, reward: 32000 }, { nick: "WiNifly", place: 2, reward: 36000 }, { nick: "γύψος", place: 5, reward: 3800 }, { nick: "Mr.V", place: 6, reward: 3400 }, { nick: "Malek3084", place: 7, reward: 0 }] },
    { time: "20:00", name: "Hyper Turbo 300", buyin: 300, league: 2, players: [{ nick: "Olegan393", place: 4, reward: 4658 }, { nick: "Sarmat1305", place: 57, reward: 0 }, { nick: "Leokampus", place: 66, reward: 0 }, { nick: "allex 1983", place: 84, reward: 0 }] },
    { time: "21:00", name: "MOK", buyin: 26400, league: 2, players: [{ nick: "PlayerNGEIYu", place: 1, reward: 22620 }, { nick: "PlayerHyeEr", place: 7, reward: 1220 }, { nick: "Аспирин", place: 9, reward: 730 }, { nick: "Sarmat1305", place: 10, reward: 0 }, { nick: "VOSOvec", place: 11, reward: 0 }] }
  ],
  "15.03.2026": [
    { time: "00:00", name: "S.Bounty 2/3 150k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 8, reward: 4672 },
      { nick: "хер вам))))", place: 0, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 16800, league: 1, players: [
      { nick: "MilkyWay77", place: 2, reward: 15400 },
      { nick: "Waaar", place: 3, reward: 9100 },
      { nick: "WiNifly", place: 4, reward: 7300 },
      { nick: "king00001", place: 7, reward: 0 },
      { nick: "ПокерМанки", place: 12, reward: 0 }
    ] },
    { time: "18:00", name: "Воскресный турнир MKO 7MAX", buyin: 110000, league: 1, players: [
      { nick: "FrankL", place: 1, reward: 110300 },
      { nick: "Рамиль01", place: 3, reward: 34900 },
      { nick: "Goshan", place: 4, reward: 32100 },
      { nick: "WiNifly", place: 7, reward: 7500 },
      { nick: "ПокерМанки", place: 10, reward: 4400 }
    ] },
    { time: "20:00", name: "HOK", buyin: 45000, league: 1, players: [
      { nick: "WiNifly", place: 2, reward: 10312.5 },
      { nick: "Waaar", place: 6, reward: 5550 },
      { nick: "51region", place: 8, reward: 675 },
      { nick: "king00001", place: 10, reward: 450 },
      { nick: "Аспирин", place: 11, reward: 225 }
    ] },
    { time: "21:59", name: "Magic 500 * 150K", buyin: 10000, league: 1, players: [
      { nick: "Фокс", place: 1, reward: 36342 },
      { nick: "@Felix", place: 2, reward: 0 },
      { nick: "ДомСоветов", place: 3, reward: 0 },
      { nick: "Виктор", place: 4, reward: 0 },
      { nick: "nikola233", place: 5, reward: 0 }
    ] },
    { time: "21:20", name: "NLH KNOCKOUT 250k", buyin: 20000, league: 1, players: [
      { nick: "Рыбнадзор", place: 3, reward: 12961 },
      { nick: "comotd", place: 1, reward: 0 },
      { nick: "chazyiool", place: 0, reward: 0 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "Откотика_Я", place: 0, reward: 0 }
    ] },
    { time: "20:00", name: "PLO5 300", buyin: 10000, league: 2, players: [
      { nick: "Виктор", place: 1, reward: 151.94 },
      { nick: "Sarmat1305", place: 2, reward: 97.52 }
    ] },
    { time: "11:00", name: "Magic Bounty 60k", buyin: 10000, league: 2, players: [
      { nick: "RikAnrak", place: 6, reward: 16.37 },
      { nick: "Sarmat1305", place: 23, reward: 1.28 }
    ] },
    { time: "16:00", name: "PLO4 25K", buyin: 10000, league: 2, players: [
      { nick: "Виктор", place: 1, reward: 89.44 },
      { nick: "PROFESSOR", place: 3, reward: 32.19 }
    ] },
    { time: "21:00", name: "MOK", buyin: 12600, league: 2, players: [
      { nick: "Goshan", place: 1, reward: 10895 },
      { nick: "Аспирин", place: 2, reward: 1940 },
      { nick: "PlayerHyeEr", place: 4, reward: 960 },
      { nick: "XORTYRETSKOGO", place: 6, reward: 700 },
      { nick: "kudinas", place: 7, reward: 0 }
    ] }
  ],
  "16.03.2026": [
    { time: "12:00", name: "DV Rebuy", buyin: 20000, league: 1, players: [
      { nick: "Waaar", place: 2, reward: 12100 },
      { nick: "king00001", place: 7, reward: 0 },
      { nick: "FrankL", place: 8, reward: 0 },
      { nick: "Рамиль01", place: 10, reward: 0 },
      { nick: "MilkyWay77", place: 11, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 32000, league: 1, players: [
      { nick: "ПашаACK", place: 1, reward: 24200 },
      { nick: "WiNifly", place: 5, reward: 6200 },
      { nick: "MilkyWay77", place: 6, reward: 5500 },
      { nick: "king00001", place: 7, reward: 0 },
      { nick: "Waaar", place: 15, reward: 0 }
    ] },
    { time: "20:00", name: "HOK", buyin: 42000, league: 1, players: [
      { nick: "Аспирин", place: 5, reward: 6537.5 },
      { nick: "WiNifly", place: 6, reward: 1518.75 },
      { nick: "Waaar", place: 7, reward: 1125 },
      { nick: "ПокерМанки", place: 8, reward: 0 },
      { nick: "Рамиль01", place: 9, reward: 787.5 }
    ] },
    { time: "18:00", name: "Понедельник Меджик", buyin: 81000, league: 1, players: [
      { nick: "Volga21", place: 3, reward: 4880 },
      { nick: "SantaClauS", place: 4, reward: 4360 },
      { nick: "Waaar", place: 5, reward: 3780 },
      { nick: "razboi", place: 6, reward: 3200 },
      { nick: "ПокерМанки", place: 7, reward: 5700 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "AndrushaMorf", place: 1, reward: 29245 },
      { nick: "nikola233", place: 2, reward: 12094 },
      { nick: "asianflushie", place: 5, reward: 6039 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 250k", buyin: 20000, league: 1, players: [
      { nick: "comotd", place: 2, reward: 31701 },
      { nick: "Ярый", place: 7, reward: 10196 },
      { nick: "Em13!!", place: 12, reward: 3880 },
      { nick: "Mougli", place: 14, reward: 1980 },
      { nick: "Рыбнадзор", place: 21, reward: 1425 }
    ] },
    { time: "19:00", name: "PLO5 300", buyin: 10000, league: 2, players: [
      { nick: "Виктор", place: 3, reward: 3705 }
    ] },
    { time: "08:00", name: "Bali Yana 30k", buyin: 10000, league: 2, players: [
      { nick: "nikola233", place: 3, reward: 5655 },
      { nick: "хер вам))))", place: 8, reward: 720 }
    ] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 20000, league: 2, players: [
      { nick: "Виктор", place: 5, reward: 2.6 },
      { nick: "Sarmat1305", place: 7, reward: 70 }
    ] }
  ],
  "17.03.2026": [
    { time: "00:00", name: "S.Bounty 2/3 150k", buyin: 20000, league: 1, players: [
      { nick: "Mougli", place: 2, reward: 16492 },
      { nick: "Em13!!", place: 3, reward: 14495 }
    ] },
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 20000, league: 1, players: [
      { nick: "AndrushaMorf", place: 3, reward: 2310 },
      { nick: "nikola233", place: 0, reward: 1190 }
    ] },
    { time: "10:00", name: "DV Turbo 500 90K", buyin: 500, league: 1, players: [
      { nick: "AndrushaMorf", place: 7, reward: 4906 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 15200, league: 1, players: [
      { nick: "FrankL", place: 2, reward: 11460 },
      { nick: "king00001", place: 4, reward: 0 },
      { nick: "Waaar", place: 8, reward: 0 },
      { nick: "MilkyWay77", place: 11, reward: 0 },
      { nick: "WB@._", place: 14, reward: 0 }
    ] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 30000, league: 1, players: [
      { nick: "хер вам))))", place: 1, reward: 20535 },
      { nick: "Sarmat1305", place: 9, reward: 228 }
    ] },
    { time: "13:00", name: "DV Bounty 150k", buyin: 10000, league: 1, players: [
      { nick: "AndrushaMorf", place: 1, reward: 47055 },
      { nick: "туз буби", place: 46, reward: 125 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 22400, league: 1, players: [
      { nick: "WiNifly", place: 1, reward: 22200 },
      { nick: "ПокерМанки", place: 3, reward: 9000 },
      { nick: "Waaar", place: 8, reward: 0 },
      { nick: "Rifa", place: 9, reward: 0 },
      { nick: "MilkyWay77", place: 11, reward: 0 }
    ] },
    { time: "18:00", name: "BOUNTY MAGIC", buyin: 10000, league: 1, players: [
      { nick: "Фокс", place: 6, reward: 70367 },
      { nick: "siropchik", place: 12, reward: 18866 }
    ] },
    { time: "18:00", name: "Турнир Вторника", buyin: 75600, league: 2, players: [
      { nick: "GetHigh", place: 1, reward: 32090 },
      { nick: "Rifa", place: 2, reward: 19750 },
      { nick: "Рамиль01", place: 3, reward: 10000 },
      { nick: "AliySvin", place: 4, reward: 8770 },
      { nick: "Чеб43", place: 7, reward: 4820 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 200, league: 2, players: [
      { nick: "хер вам))))", place: 3, reward: 34.48 }
    ] },
    { time: "20:00", name: "HOK Magic MKO 7MAX", buyin: 48000, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 36450 },
      { nick: "Coo1er91", place: 3, reward: 7250 },
      { nick: "Rifa", place: 7, reward: 0 },
      { nick: "WiNifly", place: 9, reward: 0 },
      { nick: "ПокерМанки", place: 10, reward: 0 }
    ] },
    { time: "20:00", name: "HR 5000 250K", buyin: 5000, league: 1, players: [
      { nick: "comotd", place: 5, reward: 32957 },
      { nick: "NINT3NDO", place: 9, reward: 8889 }
    ] }
  ],
  "18.03.2026": [
    { time: "00:00", name: "S.Bounty 2/3 150k", buyin: 20000, league: 1, players: [
      { nick: "Рыбнадзор", place: 7, reward: 7037 },
      { nick: "Em13!!", place: 10, reward: 3212 },
      { nick: "DashMilash", place: 15, reward: 300 },
      { nick: "nikola233", place: 25, reward: 300 },
      { nick: "AndrushaMorf", place: 0, reward: 0 }
    ] },
    { time: "02:00", name: "Deep Night 20k", buyin: 10000, league: 2, players: [
      { nick: "Ярый", place: 4, reward: 2215 },
      { nick: "XP3904233", place: 12, reward: 0 },
      { nick: "Жуля", place: 0, reward: 0 }
    ] },
    { time: "10:00", name: "DV Turbo 500 90K", buyin: 500, league: 1, players: [
      { nick: "Фокс", place: 6, reward: 6004 },
      { nick: "chazyiool", place: 0, reward: 0 },
      { nick: "asianflushie", place: 42, reward: 0 },
      { nick: "AndrushaMorf", place: 52, reward: 0 },
      { nick: "comotd", place: 25, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 17600, league: 1, players: [
      { nick: "Рамиль01", place: 1, reward: 22000 },
      { nick: "BOTEZGAMBIT", place: 4, reward: 0 },
      { nick: "Waaar", place: 6, reward: 0 },
      { nick: "MilkyWay77", place: 7, reward: 0 },
      { nick: "FrankL", place: 13, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "хер вам)))))", place: 1, reward: 19223 },
      { nick: "siropchik", place: 4, reward: 3926 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "Рыбнадзор", place: 8, reward: 0 },
      { nick: "Lesnov", place: 18, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 13600, league: 1, players: [
      { nick: "FrankL", place: 3, reward: 12000 },
      { nick: "ПокерМанки", place: 4, reward: 0 },
      { nick: "king00001", place: 6, reward: 0 },
      { nick: "Waaar", place: 8, reward: 0 },
      { nick: "Рамиль01", place: 18, reward: 0 }
    ] },
    { time: "18:00", name: "Freeroll 1 MLN", buyin: 1000000, league: 1, players: [
      { nick: "Дикий", place: 2, reward: 144305 },
      { nick: "XP3864042", place: 8, reward: 20615 },
      { nick: "H744HH", place: 18, reward: 8761 },
      { nick: "36myxa36", place: 62, reward: 1958 },
      { nick: "DashMilash", place: 64, reward: 1958 }
    ] },
    { time: "20:00", name: "HOK", buyin: 41000, league: 1, players: [
      { nick: "WiNifly", place: 4, reward: 4300 },
      { nick: "Rifa", place: 7, reward: 675 },
      { nick: "Waaar", place: 11, reward: 0 },
      { nick: "Аспирин", place: 12, reward: 1012.5 },
      { nick: "ПокерМанки", place: 16, reward: 0 }
    ] },
    { time: "23:00", name: "Night magic 100K", buyin: 100000, league: 1, players: [
      { nick: "Бабник", place: 3, reward: 6100 },
      { nick: "Рыбнадзор", place: 7, reward: 3050 },
      { nick: "Em13!!", place: 18, reward: 0 },
      { nick: "Чеб43", place: 31, reward: 0 },
      { nick: "Фокс", place: 34, reward: 0 }
    ] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 2800, league: 2, players: [
      { nick: "Чеб43", place: 1, reward: 2890 },
      { nick: "tatarin_1", place: 5, reward: 0 },
      { nick: "Tanechka", place: 6, reward: 0 },
      { nick: "Аспирин", place: 7, reward: 0 },
      { nick: "XORTYRETSKOGO", place: 10, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Среды", buyin: 33000, league: 2, players: [
      { nick: "n1kk1ex", place: 5, reward: 3520 },
      { nick: "RnD-BuB", place: 10, reward: 840 },
      { nick: "Tanechka", place: 11, reward: 780 },
      { nick: "AliPetuhov", place: 17, reward: 730 },
      { nick: "ЧУРменя", place: 20, reward: 730 }
    ] },
    { time: "21:00", name: "MKO 7MAX", buyin: 9900, league: 2, players: [
      { nick: "WiNifly", place: 1, reward: 9415 },
      { nick: "TonniHalf", place: 2, reward: 3855 },
      { nick: "SantaClauS", place: 3, reward: 1730 },
      { nick: "МОРПЕН", place: 4, reward: 0 },
      { nick: "Евгений.А", place: 5, reward: 0 }
    ] }
  ],
  "19.03.2026": [
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 20000, league: 1, players: [
      { nick: "shockin", place: 1, reward: 3066 },
      { nick: "хер вам)))))", place: 2, reward: 4326 }
    ] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 4700, league: 2, players: [
      { nick: "mr.Fox", place: 1, reward: 3970 },
      { nick: "zagrebnagreb", place: 2, reward: 2370 },
      { nick: "Банк_Псб", place: 4, reward: 0 },
      { nick: "AlenaSt", place: 5, reward: 0 },
      { nick: "Чеб43", place: 6, reward: 0 }
    ] },
    { time: "16:00", name: "HOLDEM 6+ GTD 40K", buyin: 10000, league: 1, players: [
      { nick: "comotd", place: 3, reward: 6000 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 28800, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 23000 },
      { nick: "MilkyWay77", place: 4, reward: 7400 },
      { nick: "WiNifly", place: 5, reward: 6800 },
      { nick: "Milan", place: 8, reward: 0 },
      { nick: "Рамиль01", place: 13, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Четверга", buyin: 95000, league: 1, players: [
      { nick: "Coo1er91", place: 1, reward: 95100 },
      { nick: "GetHigh", place: 10, reward: 7600 },
      { nick: "kriak", place: 6, reward: 5300 },
      { nick: "Waaar", place: 7, reward: 4200 },
      { nick: "WiNifly", place: 9, reward: 2500 }
    ] },
    { time: "18:00", name: "SHR 175$ - 2/3 PKO", buyin: 17500, league: 1, players: [
      { nick: "Фокс", place: 8, reward: 27283 },
      { nick: "NINT3NDO", place: 0, reward: 0 }
    ] },
    { time: "20:00", name: "HOK", buyin: 43000, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 31096.89 },
      { nick: "ПокерМанки", place: 3, reward: 7209.37 },
      { nick: "Ферапонт", place: 5, reward: 7212.5 },
      { nick: "МОРПЕН", place: 6, reward: 2053.12 },
      { nick: "WiNifly", place: 10, reward: 0 }
    ] }
  ],
  "20.03.2026": [
    { time: "00:00", name: "S.Bounty 2/3 150k", buyin: 20000, league: 1, players: [
      { nick: "Proxor", place: 8, points: 50, reward: 30.06 },
      { nick: "Em13!!", place: 20, points: 0, reward: 0 },
      { nick: "Olegggaaa", place: 0, points: 0, reward: 0 },
      { nick: "Бабник", place: 0, points: 0, reward: 0 }
    ] },
    { time: "11:00", name: "Magic Bounty 60k", buyin: 10000, league: 2, players: [
      { nick: "Рыбнадзор", place: 3, points: 90, reward: 39.51 },
      { nick: "Malek3084", place: 13, points: 0, reward: 6.74 },
      { nick: "К–700", place: 34, points: 0, reward: 0 },
      { nick: "augustrdgr", place: 57, points: 0, reward: 0 },
      { nick: "бугимен", place: 60, points: 0, reward: 0 }
    ] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 20000, league: 1, players: [
      { nick: "kriaks", place: 3, points: 90, reward: 34.76 },
      { nick: "Sarmat1305", place: 0, points: 0, reward: 0 },
      { nick: "AndrushaMorf", place: 0, points: 0, reward: 0 },
      { nick: "хер вам)))))", place: 0, points: 0, reward: 0 }
    ] },
    { time: "13:00", name: "DV Bounty 150k", buyin: 10000, league: 1, players: [
      { nick: "AndrushaMorf", place: 4, points: 70, reward: 82.86 },
      { nick: "nikola233", place: 21, points: 0, reward: 0 },
      { nick: "Malek3084", place: 0, points: 0, reward: 0 },
      { nick: "pryanik2la", place: 0, points: 0, reward: 0 },
      { nick: "бугимен", place: 0, points: 0, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "nikola233", place: 2, points: 110, reward: 50.65 },
      { nick: "pryanik2la", place: 10, points: 0, reward: 0 },
      { nick: "kriaks", place: 15, points: 0, reward: 0 },
      { nick: "Em13!!", place: 0, points: 0, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 20800, league: 1, players: [
      { nick: "Monfokon", place: 1, points: 135, reward: 23800 },
      { nick: "MilkyWay77", place: 9, points: 0, reward: 0 },
      { nick: "WiNifly", place: 11, points: 0, reward: 0 },
      { nick: "Waaar", place: 12, points: 0, reward: 0 },
      { nick: "Банк_Псб", place: 14, points: 0, reward: 0 }
    ] },
    { time: "18:00", name: "Пятница Прогрессив", buyin: 77000, league: 1, players: [
      { nick: "kriak", place: 2, points: 110, reward: 14624.84 },
      { nick: "Waaar", place: 3, points: 90, reward: 7721.25 },
      { nick: "yxo174", place: 4, points: 70, reward: 6847.18 },
      { nick: "FrankL", place: 5, points: 60, reward: 4833.13 },
      { nick: "Poker_poher", place: 8, points: 50, reward: 6934.05 }
    ] },
    { time: "20:00", name: "MKO 7MAX MTT-NLH", buyin: 13200, league: 2, players: [
      { nick: "Akich10", place: 2, points: 110, reward: 6710 },
      { nick: "Tanechka", place: 4, points: 70, reward: 1290 },
      { nick: "XORTYRETSKOGO", place: 7, points: 0, reward: 0 },
      { nick: "ZVIGENI", place: 8, points: 0, reward: 0 },
      { nick: "tatarin_1", place: 9, points: 0, reward: 0 }
    ] }
  ],
  "21.03.2026": [
    { time: "08:00", name: "Bali Yana 30k", buyin: 100, league: 2, players: [
      { nick: "Olegan393", place: 2, reward: 7463 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "comotd", place: 5, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 16800, league: 1, players: [
      { nick: "MilkyWay77", place: 1, reward: 15880 },
      { nick: "FrankL", place: 2, reward: 9500 },
      { nick: "nikola233", place: 3, reward: 6300 },
      { nick: "Akich10", place: 5, reward: 0 },
      { nick: "Waaar", place: 6, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 13600, league: 1, players: [
      { nick: "FrankL", place: 1, reward: 30000 },
      { nick: "king00001", place: 2, reward: 18000 },
      { nick: "Рамиль01", place: 4, reward: 0 },
      { nick: "Waaar", place: 10, reward: 0 },
      { nick: "MilkyWay77", place: 12, reward: 0 }
    ] },
    { time: "20:00", name: "HOK Magic", buyin: 46000, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 41700 },
      { nick: "FrankL", place: 2, reward: 21200 },
      { nick: "Venius", place: 4, reward: 4400 },
      { nick: "Monfokon", place: 6, reward: 3200 },
      { nick: "ZVIGENI", place: 7, reward: 0 }
    ] },
    { time: "22:00", name: "Magic MKO 150K", buyin: 10000, league: 1, players: [
      { nick: "Тряпа", place: 4, reward: 14737 },
      { nick: "Фокс", place: 31, reward: 0 },
      { nick: "Malek3084", place: 72, reward: 0 },
      { nick: "Em13!!", place: 53, reward: 0 }
    ] }
  ],
  "22.03.2026": [
    { time: "06:00", name: "Два туза.Доллары MTT FAST DEEP", buyin: 0, league: 1, players: [
      { nick: "FrankL", place: 2, points: 135, reward: 29440 }
    ] },
    { time: "06:00", name: "Два туза.Доллары MTT FAST DEEP", buyin: 0, league: 1, players: [
      { nick: "FrankL", place: 1, points: 110, reward: 54050 }
    ] },
    { time: "10:00", name: "DV Turbo 500 90K", buyin: 10000, league: 1, players: [
      { nick: "Откотика_Я", place: 5, reward: 6692 },
      { nick: "AndrushaMorf", place: 46, reward: 0 },
      { nick: "xx🎰xx", place: 48, reward: 0 }
    ] },
    { time: "11:00", name: "Magic Bounty 60k", buyin: 10000, league: 2, players: [
      { nick: "YuraK700", place: 2, reward: 13999 },
      { nick: "Фокс", place: 0, reward: 0 },
      { nick: "xx🍰xx", place: 0, reward: 0 },
      { nick: "хер вам)))))", place: 44, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 16800, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 17300 },
      { nick: "Банк_Псб", place: 4, reward: 0 },
      { nick: "Borsoi", place: 7, reward: 0 },
      { nick: "Пряник", place: 8, reward: 0 },
      { nick: "FrankL", place: 9, reward: 0 }
    ] },
    { time: "13:00", name: "DV MAIN 1MLN", buyin: 20000, league: 1, players: [
      { nick: "potpor", place: 1, reward: 215486 },
      { nick: "Рыбнадзор", place: 15, reward: 8678 },
      { nick: "kabanchik", place: 0, reward: 0 },
      { nick: "хер вам)))))", place: 0, reward: 0 },
      { nick: "Чеб43", place: 0, reward: 0 }
    ] },
    { time: "14:00", name: "Два туза.Доллары MTT FAST PKO", buyin: 0, league: 1, players: [
      { nick: "FrankL", place: 4, reward: 6210 }
    ] },
    { time: "15:00", name: "Два туза.Доллары MTT DAILY PKO", buyin: 0, league: 1, players: [
      { nick: "FrankL", place: 1, reward: 16445 }
    ] },
    { time: "16:00", name: "Два туза.Доллары MTT WOW MYSTERY", buyin: 0, league: 1, players: [
      { nick: "FrankL", place: 6, reward: 5175 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 25600, league: 1, players: [
      { nick: "ДжекиЧан", place: 1, reward: 22200 },
      { nick: "WiNifly", place: 2, reward: 15000 },
      { nick: "XORTYRETSKOGO", place: 4, reward: 7200 },
      { nick: "Пряник", place: 5, reward: 6600 },
      { nick: "ПокерМанки", place: 6, reward: 0 }
    ] },
    { time: "18:00", name: "Воскресный турнир MKO 7MAX", buyin: 128000, league: 1, players: [
      { nick: "Рамиль01", place: 2, reward: 41831.25 },
      { nick: "ПокерМанки", place: 3, reward: 18418.75 },
      { nick: "Бабник", place: 5, reward: 19175 },
      { nick: "WiNifly", place: 8, reward: 6775 },
      { nick: "Milan", place: 9, reward: 7900 }
    ] },
    { time: "21:00", name: "MOK", buyin: 13200, league: 2, players: [
      { nick: "XORTYRETSKOGO", place: 1, reward: 10975 },
      { nick: "WiNifly", place: 2, reward: 2200 },
      { nick: "Tanechka", place: 3, reward: 1315 },
      { nick: "SantaClauS", place: 5, reward: 960 },
      { nick: "MORPEH", place: 6, reward: 0 }
    ] }
  ],
  "23.03.2026": [
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 20000, league: 1, players: [
      { nick: "shockin", place: 1, reward: 11113 },
      { nick: "AndrushaMorf", place: 9, reward: 1505 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "Егор", place: 0, reward: 0 },
      { nick: "хер вам)))))", place: 8, reward: 0 }
    ] },
    { time: "06:00", name: "Два туза.Доллары MTT FAST DEEP", buyin: 0, league: 1, players: [
      { nick: "FrankL", place: 3, points: 90, reward: 17940 }
    ] },
    { time: "08:00", name: "Bali Yana 30k", buyin: 30000, league: 1, players: [
      { nick: "ABevege", place: 1, reward: 14645 },
      { nick: "shockin", place: 9, reward: 0 },
      { nick: "nikola233", place: 11, reward: 0 },
      { nick: "✴️PσҜeяisT", place: 0, reward: 0 },
      { nick: "AndrushaMorf", place: 0, reward: 0 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 200, league: 2, players: [
      { nick: "Sarmat1305", place: 4, reward: 2037 },
      { nick: "shockin", place: 0, reward: 475 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 28800, league: 1, players: [
      { nick: "Waaar", place: 3, reward: 6500 },
      { nick: "нежданчик", place: 4, reward: 5100 },
      { nick: "ДжекиЧан", place: 6, reward: 0 },
      { nick: "MilkyWay77", place: 7, reward: 0 },
      { nick: "FrankL", place: 8, reward: 0 }
    ] },
    { time: "13:00", name: "DV Bounty 150k PKO", buyin: 10000, league: 1, players: [
      { nick: "хер вам)))))", place: 1, reward: 6499 },
      { nick: "Рыбнадзор", place: 2, reward: 5350 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "АршакМкртчян", place: 0, reward: 0 },
      { nick: "Monfokon", place: 0, reward: 0 }
    ] },
    { time: "18:00", name: "Monday 250k GTD", buyin: 5000, league: 1, players: [
      { nick: "Фокс", place: 1, reward: 82316 },
      { nick: "Waaarr", place: 8, reward: 5406 },
      { nick: "хер вам)))))", place: 158, reward: 0 },
      { nick: "YuraK700", place: 37, reward: 0 },
      { nick: "pryanik2la", place: 115, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Понедельника MKO", buyin: 80000, league: 1, players: [
      { nick: "Waaar", place: 2, reward: 17760 },
      { nick: "JinDaniels", place: 4, reward: 5810 },
      { nick: "kriak", place: 5, reward: 7290 },
      { nick: "ДжекиЧан", place: 6, reward: 27430 },
      { nick: "Палач", place: 7, reward: 3330 }
    ] },
    { time: "20:00", name: "НОК KO", buyin: 27000, league: 1, players: [
      { nick: "ПокерМанки", place: 2, reward: 12200 },
      { nick: "Waaar", place: 4, reward: 4350 },
      { nick: "γύψος", place: 6, reward: 3037.5 },
      { nick: "Рамиль01", place: 8, reward: 3262.5 },
      { nick: "WiNifly", place: 9, reward: 450 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 250k", buyin: 20000, league: 1, players: [
      { nick: "Рыбнадзор", place: 3, reward: 14518 },
      { nick: "Monfokon", place: 6, reward: 11532 },
      { nick: "Lesnov", place: 48, reward: 700 },
      { nick: "хер вам)))))", place: 20, reward: 581 },
      { nick: "Бабник", place: 54, reward: 350 }
    ] },
    { time: "21:00", name: "MKO 7MAX", buyin: 12000, league: 2, players: [
      { nick: "Tanechka", place: 1, reward: 11490 },
      { nick: "VOSOvec", place: 4, reward: 3800 },
      { nick: "WiNifly", place: 5, reward: 1120 },
      { nick: "Jkeyx", place: 9, reward: 0 },
      { nick: "PlayerHyeEr", place: 10, reward: 0 }
    ] },
    { time: "22:00", name: "Magic 500 150K", buyin: 10000, league: 1, players: [
      { nick: "💕💕💕", place: 4, reward: 10142 },
      { nick: "Em13!!", place: 9, reward: 7004 },
      { nick: "XP3157488", place: 92, reward: 0 },
      { nick: "АршакМкртчян", place: 0, reward: 0 },
      { nick: "Pingvi", place: 0, reward: 0 }
    ] },
    { time: "23:00", name: "Night magic 100K", buyin: 100000, league: 1, players: [
      { nick: "Фокс", place: 7, reward: 2848 },
      { nick: "Бабник", place: 0, reward: 0 },
      { nick: "AndrushaMorf", place: 24, reward: 0 },
      { nick: "хер вам)))))", place: 0, reward: 0 }
    ] }
  ],
  "24.03.2026": [
    { time: "08:00", name: "Bali Yana 30k", buyin: 30000, league: 1, players: [
      { nick: "nikola233", place: 2, reward: 8498 },
      { nick: "comotd", place: 0, reward: 0 },
      { nick: "shockin", place: 15, reward: 0 },
      { nick: "AndrushaMorf", place: 0, reward: 0 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 200, league: 2, players: [
      { nick: "Sarmat1305", place: 3, points: 90, reward: 1580 },
      { nick: "shockin", place: 0, reward: 0 },
      { nick: "asianflushie", place: 0, reward: 0 },
      { nick: "⚡72⚡", place: 0, reward: 0 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 200, league: 2, players: [
      { nick: "Sarmat1305", place: 5, points: 60, reward: 514 },
      { nick: "shockin", place: 0, reward: 0 },
      { nick: "asianflushie", place: 0, reward: 0 },
      { nick: "⚡72⚡", place: 0, reward: 0 }
    ] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 30000, league: 1, players: [
      { nick: "Sarmat1305", place: 2, reward: 4176 },
      { nick: "♤PROFESSOR♤", place: 0, reward: 0 },
      { nick: "AndrushaMorf", place: 0, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 15200, league: 1, players: [
      { nick: "pitbulltip", place: 2, reward: 12100 },
      { nick: "Borsoi", place: 9, reward: 0 },
      { nick: "Рамиль01", place: 13, reward: 0 },
      { nick: "MilkyWay77", place: 15, reward: 0 },
      { nick: "FrankL", place: 16, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "nikola233", place: 2, reward: 9303 },
      { nick: "АршакМкртчян", place: 0, reward: 0 },
      { nick: "AndrushaMorf", place: 0, reward: 0 },
      { nick: "Monfokon", place: 0, reward: 0 },
      { nick: "Бабник", place: 0, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 22400, league: 1, players: [
      { nick: "WiNifly", place: 1, reward: 22200 },
      { nick: "Пряник", place: 2, reward: 15000 },
      { nick: "Waaar", place: 4, reward: 7200 },
      { nick: "FrankL", place: 8, reward: 0 },
      { nick: "Tanechka", place: 10, reward: 0 }
    ] },
    { time: "18:00", name: "BOUNTY MAGIC 50k", buyin: 10000, league: 1, players: [
      { nick: "markins", place: 1, reward: 165234 },
      { nick: "pryanik2la", place: 125, reward: 0 },
      { nick: "chazyiool", place: 0, reward: 0 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "outsider", place: 100, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Вторника", buyin: 65100, league: 2, players: [
      { nick: "kriak", place: 1, reward: 31000 },
      { nick: "Witch", place: 2, reward: 19000 },
      { nick: "Prushnik", place: 8, reward: 3100 },
      { nick: "Volga21", place: 15, reward: 1600 },
      { nick: "Бабник", place: 17, reward: 1400 }
    ] },
    { time: "20:00", name: "HOK Magic", buyin: 46000, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 24900 },
      { nick: "WiNifly", place: 4, reward: 7200 },
      { nick: "FrankL", place: 5, reward: 3200 },
      { nick: "ПокерМанки", place: 6, reward: 2900 },
      { nick: "@Felix", place: 7, reward: 0 }
    ] }
  ],
  "25.03.2026": [
    { time: "00:00", name: "S.Bounty 2/3 🥊 150k", buyin: 20000, league: 1, players: [
      { nick: "Бабник", place: 12, reward: 21590 },
      { nick: "Рыбнадзор", place: 8, reward: 18330 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 8800, league: 1, players: [
      { nick: "FrankL", place: 2, reward: 9000 },
      { nick: "XORTYRETSKOGO", place: 3, reward: 6000 },
      { nick: "Waaar", place: 10, reward: 0 },
      { nick: "Malek3084", place: 12, reward: 0 },
      { nick: "Резвый", place: 14, reward: 0 }
    ] },
    { time: "14:00", name: "Bounty 200🥊 70K GTD", buyin: 200, league: 2, players: [
      { nick: "outsider", place: 2, reward: 8259 },
      { nick: "Откотика_Я", place: 5, reward: 3942 },
      { nick: "Руслан", place: 21, reward: 341 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 11200, league: 1, players: [
      { nick: "FrankL", place: 3, reward: 9000 },
      { nick: "__JD__", place: 4, reward: 7200 },
      { nick: "MilkyWay77", place: 6, reward: 0 },
      { nick: "Рамиль01", place: 12, reward: 0 },
      { nick: "XORTYRETSKOGO", place: 14, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Среды", buyin: 26700, league: 2, players: [
      { nick: "Ksuha", place: 1, reward: 14500 },
      { nick: "г ᛉ 𐌰", place: 2, reward: 8400 },
      { nick: "GetHigh", place: 5, reward: 3510 },
      { nick: "LuckyBoom", place: 7, reward: 2500 },
      { nick: "AlenaSt", place: 8, reward: 1940 }
    ] },
    { time: "20:00", name: "НОК KO", buyin: 25000, league: 1, players: [
      { nick: "Waaar", place: 6, reward: 1237.5 },
      { nick: "WiNifly", place: 9, reward: 225 },
      { nick: "king00001", place: 10, reward: 646.87 },
      { nick: "MilkyWay77", place: 11, reward: 0 },
      { nick: "'ЗараЗа'", place: 14, reward: 0 }
    ] },
    { time: "21:00", name: "MKO 7MAX MTT-NLH", buyin: 13500, league: 2, players: [
      { nick: "TonniHalf", place: 1, reward: 10010 },
      { nick: "kriak", place: 3, reward: 1380 },
      { nick: "pitbulltip", place: 4, reward: 1010 },
      { nick: "YuraK700", place: 5, reward: 820 },
      { nick: "Travolta0707", place: 6, reward: 730 }
    ] }
  ],
  "26.03.2026": [
    { time: "02:00", name: "Deep Night 20k", buyin: 10000, league: 2, players: [
      { nick: "XP4012970", place: 1, reward: 5300 },
      { nick: "Бэха", place: 2, reward: 4900 }
    ] },
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 20000, league: 1, players: [
      { nick: "nikola233", place: 1, reward: 9223 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 16000, league: 1, players: [
      { nick: "Рамиль01", place: 1, reward: 26700 },
      { nick: "BOTEZGAMBIT", place: 4, reward: 0 },
      { nick: "Пряник", place: 5, reward: 0 },
      { nick: "JinDaniels", place: 11, reward: 0 },
      { nick: "Waaar", place: 14, reward: 0 }
    ] },
    { time: "14:00", name: "Micro 200 🏆 70K GTD", buyin: 200, league: 2, players: [
      { nick: "Бабник", place: 1, reward: 21057 },
      { nick: "Рыбнадзор", place: 13, reward: 232 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "FizzBuzz", place: 4, reward: 6961 },
      { nick: "хер вам)))))", place: 5, reward: 943 },
      { nick: "АршакМкртчян", place: 21, reward: 315 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 20800, league: 1, players: [
      { nick: "Рамиль01", place: 1, reward: 30000 },
      { nick: "FrankL", place: 9, reward: 0 },
      { nick: "__JD__", place: 10, reward: 0 },
      { nick: "WiNifly", place: 12, reward: 0 },
      { nick: "Evgen.", place: 13, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Четверга", buyin: 63000, league: 1, players: [
      { nick: "Ksuha🐊", place: 3, reward: 7500 },
      { nick: "GetHigh", place: 5, reward: 13400 },
      { nick: "WiNifly", place: 9, reward: 2700 },
      { nick: "kashey", place: 11, reward: 0 },
      { nick: "Waaar", place: 13, reward: 0 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 250k", buyin: 20000, league: 1, players: [
      { nick: "Бабник", place: 6, reward: 9822 },
      { nick: "siropchik", place: 26, reward: 2882 },
      { nick: "Em13!!", place: 23, reward: 1704 },
      { nick: "Murchello", place: 36, reward: 800 },
      { nick: "Asta la Vista", place: 43, reward: 350 }
    ] },
    { time: "22:00", name: "Magic", buyin: 500, league: 1, players: [
      { nick: "GhosTT", place: 2, reward: 20499 }
    ] }
  ],
  "27.03.2026": [
    { time: "12:00", name: "DV Rebuy", buyin: 17600, league: 1, players: [
      { nick: "Ksuha🦖", place: 1, reward: 16800 },
      { nick: "Waaar", place: 2, reward: 11400 },
      { nick: "Рамиль01", place: 3, reward: 6860 },
      { nick: "MilkyWay77", place: 5, reward: 4900 },
      { nick: "Просто", place: 13, reward: 0 }
    ] },
    { time: "13:00", name: "DV Bounty 150k PKO", buyin: 10000, league: 1, players: [
      { nick: "Em13!!", place: 6, reward: 8015 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 17600, league: 1, players: [
      { nick: "GetHigh", place: 1, reward: 30000 },
      { nick: "Палач", place: 3, reward: 12000 },
      { nick: "WiNifly", place: 4, reward: 0 },
      { nick: "king00001", place: 7, reward: 0 },
      { nick: "Waaar", place: 9, reward: 0 }
    ] },
    { time: "18:00", name: "Пятница Прогрессив", buyin: 46000, league: 1, players: [
      { nick: "Рамиль01", place: 1, reward: 29639.61 },
      { nick: "Waaar", place: 3, reward: 5767.5 },
      { nick: "simba", place: 7, reward: 3560 },
      { nick: "WiNifly", place: 8, reward: 3335.62 },
      { nick: "Rifa", place: 10, reward: 3574.37 }
    ] },
    { time: "20:00", name: "Hyper Turbo 300", buyin: 300, league: 2, players: [
      { nick: "Murchello", place: 3, reward: 8358 }
    ] },
    { time: "21:00", name: "MKO 7MAX", buyin: 17100, league: 2, players: [
      { nick: "kriak", place: 1, reward: 10110 },
      { nick: "PlayerHyeEr", place: 3, reward: 1780 },
      { nick: "ДжекПотный", place: 5, reward: 1175 },
      { nick: "MoW3R", place: 6, reward: 1030 },
      { nick: "tatarin_1", place: 7, reward: 870 }
    ] }
  ],
  "28.03.2026": [
    { time: "00:00", name: "S.Bounty 2/3 🥊 150k", buyin: 20000, league: 1, players: [
      { nick: "AndrushaMorf", place: 3, reward: 21134 },
      { nick: "Em13!!", place: 14, reward: 632 }
    ] },
    { time: "02:00", name: "Deep Night 20k", buyin: 10000, league: 2, players: [
      { nick: "Жуля", place: 5, reward: 1770 }
    ] },
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 20000, league: 1, players: [
      { nick: "AndrushaMorf", place: 1, reward: 4654 },
      { nick: "Olegan393", place: 5, reward: 245 }
    ] },
    { time: "10:00", name: "DV Turbo 500 90K", buyin: 500, league: 1, players: [
      { nick: "Фокс", place: 1, reward: 34610 }
    ] },
    { time: "13:00", name: "DV Bounty 150k PKO", buyin: 10000, league: 1, players: [
      { nick: "nikola233", place: 8, reward: 6735 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "Em13!!", place: 6, reward: 4336 }
    ] },
    { time: "16:00", name: "PLO4 25K", buyin: 25000, league: 2, players: [
      { nick: "pryanik2la", place: 6, reward: 1325 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 8000, league: 1, players: [
      { nick: "Mr.V", place: 5, reward: 5500 },
      { nick: "Рамиль01", place: 19, reward: 0 },
      { nick: "LuckyBoom", place: 20, reward: 0 },
      { nick: "pitbulltip", place: 21, reward: 0 }
    ] },
    { time: "18:00", name: "LUCKY 777 GTD", buyin: 500, league: 1, players: [
      { nick: "AndrushaMorf", place: 6, reward: 40189 },
      { nick: "nachyn", place: 38, reward: 2194 }
    ] },
    { time: "20:00", name: "HOK", buyin: 26000, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 25295.32 },
      { nick: "Rifa", place: 2, reward: 15521.87 },
      { nick: "Y-gin", place: 7, reward: 1209.37 },
      { nick: "Рамиль01", place: 14, reward: 2700 },
      { nick: "Coo1er91", place: 15, reward: 0 }
    ] },
    { time: "21:00", name: "MKO 7MAX", buyin: 11400, league: 2, players: [
      { nick: "PlayerHyeEr", place: 1, reward: 9720 },
      { nick: "Baldendi", place: 3, reward: 1195 },
      { nick: "ЧУРменя", place: 5, reward: 870 },
      { nick: "ШЛЯПАУСАТ", place: 6, reward: 0 },
      { nick: "mikrus", place: 7, reward: 0 }
    ] },
    { time: "22:00", name: "Magic", buyin: 500, league: 1, players: [
      { nick: "kabanchik", place: 10, reward: 5400 },
      { nick: "АршакМкртчян", place: 5, reward: 5266 }
    ] },
    { time: "23:00", name: "Night magic 100K", buyin: 100000, league: 1, players: [
      { nick: "kabanchik", place: 6, reward: 12305 },
      { nick: "Mougli", place: 4, reward: 1815 }
    ] }
  ],
  "29.03.2026": [
    { time: "00:00", name: "S.Bounty 2/3 🥊 150k", buyin: 20000, league: 1, players: [
      { nick: "Рыбнадзор", place: 7, reward: 10073 },
      { nick: "АршакМкртчян", place: 10, reward: 5354 },
      { nick: "Em13!!", place: 17, reward: 150 }
    ] },
    { time: "10:00", name: "DV Turbo 500 90K", buyin: 500, league: 1, players: [
      { nick: "Фокс", place: 6, reward: 5934 }
    ] },
    { time: "11:00", name: "Magic Bounty 60k", buyin: 10000, league: 2, players: [
      { nick: "YuraK700", place: 8, reward: 449 }
    ] },
    { time: "13:00", name: "DV MAIN 1MLN", buyin: 20000, league: 1, players: [
      { nick: "Бабник", place: 9, reward: 14233 }
    ] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 4100, league: 2, players: [
      { nick: "kriak", place: 1, reward: 3430 },
      { nick: "l🦓l", place: 4, reward: 0 },
      { nick: "Bylochka😉", place: 5, reward: 0 },
      { nick: "F001", place: 7, reward: 0 },
      { nick: "LuckyBoom", place: 8, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "Рыбнадзор", place: 3, reward: 7551 },
      { nick: "АршакМкртчян", place: 6, reward: 4567 },
      { nick: "AndrushaMorf", place: 15, reward: 450 }
    ] },
    { time: "16:00", name: "PLO4 25K", buyin: 25000, league: 2, players: [
      { nick: "YuraK700", place: 8, reward: 983 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 24000, league: 1, players: [
      { nick: "yxo174", place: 1, reward: 19800 },
      { nick: "Рамиль01", place: 2, reward: 13400 },
      { nick: "FrankL", place: 7, reward: 0 },
      { nick: "ПокерМанки", place: 9, reward: 0 },
      { nick: "WiNifly", place: 12, reward: 0 }
    ] },
    { time: "18:00", name: "Воскресный турнир", buyin: 148000, league: 1, players: [
      { nick: "FanatCoo1era", place: 2, reward: 46387.5 },
      { nick: "kriak", place: 4, reward: 25250 },
      { nick: "Waaar", place: 6, reward: 22606.25 },
      { nick: "Y-gin", place: 7, reward: 13150 },
      { nick: "FrankL", place: 10, reward: 4900 }
    ] },
    { time: "20:00", name: "HOK Magic", buyin: 50000, league: 1, players: [
      { nick: "WiNifly", place: 1, reward: 67500 },
      { nick: "Waaar", place: 4, reward: 5900 },
      { nick: "Рамиль01", place: 9, reward: 0 },
      { nick: "FrankL", place: 14, reward: 0 },
      { nick: "king00001", place: 15, reward: 0 }
    ] },
    { time: "20:00", name: "PLO5 300", buyin: 300, league: 2, players: [
      { nick: "YuraK700", place: 3, reward: 3733 }
    ] },
    { time: "21:00", name: "MKO 7MAX", buyin: 14400, league: 2, players: [
      { nick: "kriak", place: 3, reward: 1475 },
      { nick: "Shkarubo", place: 4, reward: 1180 },
      { nick: "WiNifly", place: 5, reward: 1080 },
      { nick: "ШЛЯПАУСАТ", place: 6, reward: 0 },
      { nick: "XORTYRETSKOGO", place: 8, reward: 0 }
    ] },
    { time: "21:59", name: "HR 5000 250K", buyin: 5000, league: 1, players: [
      { nick: "Бардюр", place: 4, reward: 28217 }
    ] }
  ],
  "30.03.2026": [
    { time: "12:00", name: "DV Rebuy", buyin: 23200, league: 1, players: [
      { nick: "FrankL", place: 1, reward: 18400 },
      { nick: "Em13", place: 2, reward: 12500 },
      { nick: "king00001", place: 12, reward: 0 },
      { nick: "nikola233", place: 13, reward: 0 },
      { nick: "MilkyWay77", place: 15, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 28800, league: 1, players: [
      { nick: "FanatCoo1era", place: 1, reward: 27200 },
      { nick: "MiracleDivice", place: 3, reward: 11040 },
      { nick: "Рамиль01", place: 4, reward: 8800 },
      { nick: "Em13", place: 5, reward: 8000 },
      { nick: "MilkyWay77", place: 10, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Понедельника", buyin: 87500, league: 1, players: [
      { nick: "Y-gin", place: 1, reward: 48925 },
      { nick: "Waaar", place: 3, reward: 6790 },
      { nick: "Rifa", place: 4, reward: 9330 },
      { nick: "PlayerFD6762", place: 5, reward: 5260 },
      { nick: "FrankL", place: 7, reward: 8630 }
    ] },
    { time: "21:00", name: "MKO 7MAX", buyin: 19800, league: 2, players: [
      { nick: "Ksuha🦖", place: 2, reward: 8620 },
      { nick: "\"\"ЗараЗа\"\"", place: 3, reward: 2350 },
      { nick: "WiNifly", place: 4, reward: 1720 },
      { nick: "DemonDen", place: 5, reward: 1400 },
      { nick: "Рамиль01", place: 7, reward: 0 }
    ] }
  ],
  "31.03.2026": [
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 200, league: 2, players: [
      { nick: "nikola233", place: 3, reward: 2540 },
      { nick: "Sarmat1305", place: 6, reward: 987 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 13600, league: 1, players: [
      { nick: "Рамиль01", place: 3, reward: 6000 },
      { nick: "Ronn", place: 7, reward: 0 },
      { nick: "MiracleDivice", place: 12, reward: 0 },
      { nick: "ґ⋉ґ'", place: 13, reward: 0 }
    ] },
    { time: "13:00", name: "DV Bounty 150k PKO", buyin: 10000, league: 1, players: [
      { nick: "Em13!!", place: 2, reward: 20059 },
      { nick: "nikola233", place: 14, reward: 4362 },
      { nick: "kriaks", place: 17, reward: 1411 },
      { nick: "Бабник", place: 12, reward: 1140 }
    ] },
    { time: "15:00", name: "6+ HOLD'EM 500", buyin: 500, league: 1, players: [
      { nick: "kabanchik", place: 1, reward: 15750 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "nikola233", place: 3, reward: 10914 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 20800, league: 1, players: [
      { nick: "Waaar", place: 3, reward: 7980 },
      { nick: "WiNifly", place: 9, reward: 0 },
      { nick: "king00001", place: 10, reward: 0 },
      { nick: "FrankL", place: 12, reward: 0 },
      { nick: "Банк_Псб", place: 13, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Вторника", buyin: 53100, league: 2, players: [
      { nick: "yxo174", place: 3, reward: 8500 },
      { nick: "ґ א ⲉ ґ", place: 4, reward: 7600 },
      { nick: "51region", place: 7, reward: 4300 },
      { nick: "MiracleDivice", place: 8, reward: 2900 },
      { nick: "MoW3R", place: 9, reward: 2600 }
    ] },
    { time: "22:00", name: "Magic", buyin: 500, league: 1, players: [
      { nick: "Darkstorn", place: 9, reward: 4119 },
      { nick: "Em13!!", place: 8, reward: 1411 },
      { nick: "Фокс", place: 24, reward: 89 }
    ] }
  ],
  "01.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 🥊 150k", buyin: 20000, league: 1, players: [
      { nick: "Рыбнадзор", place: 3, reward: 13915 }
    ] },
    { time: "02:00", name: "Deep Night 20k", buyin: 10000, league: 2, players: [
      { nick: "Leokampus", place: 1, reward: 6214 }
    ] },
    { time: "08:00", name: "Bali Yana 30k", buyin: 100, league: 2, players: [
      { nick: "Malek3084", place: 3, reward: 3300 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 200, league: 2, players: [
      { nick: "Sarmat1305", place: 4, reward: 1770 }
    ] },
    { time: "11:00", name: "Magic Bounty 60k", buyin: 10000, league: 2, players: [
      { nick: "Malek3084", place: 4, reward: 5788 }
    ] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 300, league: 2, players: [
      { nick: "PROFESSOR", place: 3, reward: 4919 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 12000, league: 1, players: [
      { nick: "Waaar", place: 3, reward: 6000 },
      { nick: "FanatCoo1era", place: 4, reward: 0 },
      { nick: "Andrei350", place: 10, reward: 0 },
      { nick: "Em13!!", place: 12, reward: 0 },
      { nick: "бурят", place: 14, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 16000, league: 1, players: [
      { nick: "FrankL", place: 1, reward: 18500 },
      { nick: "WiNifly", place: 5, reward: 5500 },
      { nick: "yxo174", place: 6, reward: 0 },
      { nick: "king00001", place: 10, reward: 0 },
      { nick: "Waaar", place: 13, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Среды", buyin: 23200, league: 2, players: [
      { nick: "Timon9419", place: 3, reward: 4870 },
      { nick: "SantaClauS", place: 5, reward: 3300 },
      { nick: "Палач", place: 6, reward: 2780 },
      { nick: "VICTORINOX", place: 9, reward: 1100 },
      { nick: "AliPetuhov", place: 11, reward: 890 }
    ] },
    { time: "19:00", name: "PLO5 300", buyin: 300, league: 2, players: [
      { nick: "Rusag81", place: 1, reward: 15689 },
      { nick: "пупсик", place: 2, reward: 9389 },
      { nick: "Sarmat1305", place: 17, reward: 69 }
    ] }
  ],
  "02.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 🥊 150k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 2, reward: 13832 }
    ] },
    { time: "08:00", name: "Bali Yana 🌴🆕 30k", buyin: 10, league: 1, players: [
      { nick: "nikola233", place: 3, reward: 4588 }
    ] },
    { time: "11:00", name: "Magic Bounty 60k", buyin: 10000, league: 2, players: [
      { nick: "🦈Shark-Eyed...", place: 5, reward: 4891 }
    ] },
    { time: "15:00", name: "6+ HOLD'EM 500", buyin: 500, league: 1, players: [
      { nick: "Asta la Vista", place: 3, reward: 4471 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "Бардюр", place: 3, reward: 10505 },
      { nick: "хер вам)))))", place: 18, reward: 1800 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 24000, league: 1, players: [
      { nick: "WiNifly", place: 1, reward: 20300 },
      { nick: "MilkyWay77", place: 3, reward: 8220 },
      { nick: "king00001", place: 6, reward: 0 },
      { nick: "Waaar", place: 8, reward: 0 },
      { nick: "Ksuha", place: 12, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Четверга", buyin: 86000, league: 1, players: [
      { nick: "kriak", place: 1, reward: 65900 },
      { nick: "Poker_poher", place: 2, reward: 39200 },
      { nick: "ПокерМанки", place: 3, reward: 7600 },
      { nick: "TonniHalf😎", place: 4, reward: 6800 },
      { nick: "Hakas", place: 8, reward: 3300 }
    ] },
    { time: "20:00", name: "Hyper Turbo 300", buyin: 300, league: 2, players: [
      { nick: "Deni1210", place: 4, reward: 5293 },
      { nick: "AVOCADO 😈", place: 12, reward: 772 }
    ] },
    { time: "20:00", name: "НОК KO", buyin: 25000, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 18466.42 },
      { nick: "Евгений.А", place: 3, reward: 6703.12 },
      { nick: "WiNifly", place: 4, reward: 4931.25 },
      { nick: "king00001", place: 5, reward: 3675 },
      { nick: "FanatCoo1era", place: 14, reward: 1223.44 }
    ] },
    { time: "22:00", name: "Magic 🎯 500🎯150K", buyin: 500, league: 1, players: [
      { nick: "🦈Shark-Eyed...", place: 1, reward: 8816 },
      { nick: "Бабник", place: 2, reward: 7829 }
    ] }
  ],
  "03.04.2026": [
    { time: "12:00", name: "DV Rebuy", buyin: 7200, league: 1, players: [
      { nick: "BOTEZGAMBIT", place: 1, reward: 15000 },
      { nick: "king00001", place: 12, reward: 0 },
      { nick: "JinDaniels", place: 14, reward: 0 },
      { nick: "Евгений.А", place: 15, reward: 0 },
      { nick: "izh18rus", place: 16, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "хер вам)))))", place: 1, reward: 24145 },
      { nick: "Рыбнадзор", place: 2, reward: 6569 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 12800, league: 1, players: [
      { nick: "VOSOvec", place: 1, reward: 25000 },
      { nick: "Waaar", place: 5, reward: 0 },
      { nick: "WiNifly", place: 7, reward: 0 },
      { nick: "FrankL", place: 14, reward: 0 },
      { nick: "Палач", place: 15, reward: 0 }
    ] },
    { time: "18:00", name: "Пятница Прогрессив", buyin: 62000, league: 1, players: [
      { nick: "WiNifly", place: 1, reward: 30519.3 },
      { nick: "Waaar", place: 3, reward: 8418.12 },
      { nick: "Рамиль01", place: 5, reward: 7483.21 },
      { nick: "Shkarubo", place: 7, reward: 5887.81 },
      { nick: "Adam1993", place: 9, reward: 2876.24 }
    ] },
    { time: "18:00", name: "🏆SHR 1 MLN GTD🏆", buyin: 25000, league: 1, players: [
      { nick: "ggdsgg", place: 8, reward: 14508 }
    ] },
    { time: "21:00", name: "MKO 7MAX", buyin: 9000, league: 2, players: [
      { nick: "yxo174", place: 1, reward: 10405 },
      { nick: "WiNifly", place: 2, reward: 2760 },
      { nick: "Палач", place: 3, reward: 1835 },
      { nick: "tatarin_1", place: 4, reward: 0 },
      { nick: "TonniHalf😎", place: 5, reward: 0 }
    ] },
    { time: "22:00", name: "Magic 🍎 500🍎150K", buyin: 500, league: 1, players: [
      { nick: "AndrushaMorf", place: 11, reward: 13476 }
    ] },
    { time: "23:00", name: "Night magic 100K 🌙", buyin: 100000, league: 1, players: [
      { nick: "Mougli", place: 2, reward: 26623 },
      { nick: "Фокс", place: 8, reward: 4782 }
    ] }
  ],
  "04.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 🥊 150k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 1, reward: 51986 }
    ] },
    { time: "02:00", name: "Deep Night 20k", buyin: 10, league: 2, players: [
      { nick: "Olegan393", place: 7, reward: 984 }
    ] },
    { time: "10:00", name: "DV Turbo 500 🏆 90K", buyin: 500, league: 1, players: [
      { nick: "Em13!!", place: 1, reward: 31986 },
      { nick: "Рыбнадзор", place: 6, reward: 6118 },
      { nick: "Фокс", place: 10, reward: 1091 }
    ] },
    { time: "11:00", name: "Magic Bounty🥊 60k", buyin: 10000, league: 2, players: [
      { nick: "Рыбнадзор", place: 3, reward: 2348 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 15200, league: 1, players: [
      { nick: "FrankL", place: 2, reward: 9040 },
      { nick: "Waaar", place: 6, reward: 0 },
      { nick: "VOSOvec", place: 7, reward: 0 },
      { nick: "Банк_Псб", place: 10, reward: 0 },
      { nick: "Andrei350", place: 11, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "хер вам)))))", place: 6, reward: 5232 },
      { nick: "Бардюр", place: 11, reward: 67 },
      { nick: "Asta la Vista", place: 16, reward: 22 }
    ] },
    { time: "16:00", name: "PLO4 🎴🎴 25K 🏆", buyin: 25000, league: 2, players: [
      { nick: "Sarmat1305", place: 4, reward: 2136 },
      { nick: "YuraK700", place: 7, reward: 1056 }
    ] },
    { time: "20:00", name: "НОК 🥊", buyin: 28000, league: 1, players: [
      { nick: "@Felix", place: 2, reward: 16875 },
      { nick: "Waaar", place: 3, reward: 8719 },
      { nick: "simba", place: 10, reward: 0 },
      { nick: "kriak", place: 11, reward: 0 },
      { nick: "mr.Freeman", place: 13, reward: 563 }
    ] },
    { time: "20:00", name: "💎Hyper Turbo 300💎", buyin: 300, league: 2, players: [
      { nick: "AlenaSt", place: 6, reward: 2850 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 16800, league: 2, players: [
      { nick: "Ksuha", place: 1, reward: 13120 },
      { nick: "Marishka", place: 4, reward: 1205 },
      { nick: "XORTYRETSKOGO", place: 5, reward: 950 },
      { nick: "Архитектор", place: 8, reward: 590 },
      { nick: "набутылкин", place: 9, reward: 0 }
    ] }
  ],
  "05.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 🥊 150k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 5, reward: 8592 },
      { nick: "OMGraise_27", place: 2, reward: 0 },
      { nick: "АршакМкртчян", place: 3, reward: 0 },
      { nick: "Rusag81", place: 4, reward: 0 },
      { nick: "kabanchik", place: 5, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 20000, league: 1, players: [
      { nick: "FrankL", place: 3, reward: 7600 },
      { nick: "Waaar", place: 4, reward: 0 },
      { nick: "MilkyWay77", place: 7, reward: 0 },
      { nick: "king00001", place: 8, reward: 0 },
      { nick: "Ksuha", place: 11, reward: 0 }
    ] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 5800, league: 2, players: [
      { nick: "MilkyWay77", place: 2, reward: 2350 },
      { nick: "PlayerHyeEr", place: 5, reward: 1020 },
      { nick: "Ksuha", place: 8, reward: 0 },
      { nick: "zagrebnagreb", place: 9, reward: 0 },
      { nick: "Tanechka", place: 10, reward: 0 }
    ] },
    { time: "15:00", name: "🔶6+ HOLD'EM 500🔶", buyin: 500, league: 1, players: [
      { nick: "kabanchik", place: 1, reward: 23510 },
      { nick: "AndrushaMorf", place: 2, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 26400, league: 1, players: [
      { nick: "Waaar", place: 2, reward: 14280 },
      { nick: "king00001", place: 3, reward: 8500 },
      { nick: "tatarin_1", place: 4, reward: 6800 },
      { nick: "WiNifly", place: 5, reward: 6200 },
      { nick: "Ksuha", place: 9, reward: 0 }
    ] },
    { time: "18:00", name: "Воскресный турнир", buyin: 106000, league: 1, players: [
      { nick: "WiNifly", place: 2, reward: 42175 },
      { nick: "Алеша™", place: 11, reward: 3500 },
      { nick: "Waaar", place: 14, reward: 8225 },
      { nick: "FrankL", place: 19, reward: 1350 },
      { nick: "Sokol", place: 21, reward: 2475 }
    ] },
    { time: "19:00", name: "CRAZY MAIN EVENT", buyin: 500, league: 1, players: [
      { nick: "4ezzi", place: 7, reward: 151800, points: 135 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 20400, league: 2, players: [
      { nick: "tatarin_1", place: 1, reward: 12000 },
      { nick: "ДжекПотный", place: 2, reward: 12170 },
      { nick: "Tanechka", place: 3, reward: 2310 },
      { nick: "PlayerHyeEr", place: 4, reward: 1690 },
      { nick: "Yaroslava", place: 5, reward: 1380 }
    ] },
    { time: "22:00", name: "Energetik Tournament", buyin: 11400, league: 2, players: [
      { nick: "Shkarubo", place: 1, reward: 5950 },
      { nick: "MilkyWay77", place: 2, reward: 3560 },
      { nick: "ШЛЯПАУСАТ", place: 3, reward: 2370 },
      { nick: "pitbulltip", place: 6, reward: 0 },
      { nick: "PlayerHyeEr", place: 7, reward: 0 }
    ] }
  ],
  "06.04.2026": [
    { time: "06:00", name: "Tai 7 1/2 KO 20k", buyin: 20000, league: 1, players: [
      { nick: "nikola233", place: 2, reward: 5372 },
      { nick: "хер вам)))))", place: 6, reward: 0 },
      { nick: "your_trouble", place: 0, reward: 0 },
      { nick: "shockin", place: 0, reward: 0 },
      { nick: "Stifler", place: 0, reward: 0 }
    ] },
    { time: "08:00", name: "Bali Yana 🌴🆕 30k", buyin: 10, league: 1, players: [
      { nick: "хер вам)))))", place: 1, reward: 12849 },
      { nick: "Mougli", place: 0, reward: 0 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "МВД", place: 0, reward: 0 }
    ] },
    { time: "10:00", name: "DV Turbo 500 🏆 90K", buyin: 500, league: 1, players: [
      { nick: "AndrushaMorf", place: 9, reward: 1905 },
      { nick: "Рыбнадзор", place: 13, reward: 1192 },
      { nick: "АршакМкртчян", place: 14, reward: 1192 },
      { nick: "Em13!!", place: 19, reward: 0 },
      { nick: "хер вам)))))", place: 0, reward: 0 }
    ] },
    { time: "11:00", name: "Magic Bounty 🥊 60k", buyin: 10000, league: 2, players: [
      { nick: "AndrushaMorf", place: 6, reward: 5686 },
      { nick: "хер вам)))))", place: 7, reward: 2757 },
      { nick: "kabanchik", place: 3, reward: 2709 },
      { nick: "Malek3084", place: 5, reward: 1902 },
      { nick: "🦈Shark-Eyed...", place: 8, reward: 189 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 15200, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 19500 },
      { nick: "MilkyWay77", place: 9, reward: 0 },
      { nick: "Рамиль01", place: 11, reward: 0 },
      { nick: "FrankL", place: 12, reward: 0 },
      { nick: "Банк_Псб", place: 14, reward: 0 }
    ] },
    { time: "13:00", name: "DV Bounty 150k PKO", buyin: 10000, league: 1, players: [
      { nick: "kabanchik", place: 2, reward: 18653 },
      { nick: "Em13!!", place: 13, reward: 601 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "Бабник", place: 0, reward: 0 },
      { nick: "МВД", place: 0, reward: 0 }
    ] },
    { time: "14:00", name: "Bounty 200🥊 70K GT", buyin: 200, league: 2, players: [
      { nick: "outsider", place: 2, reward: 7092 },
      { nick: "EnotSimuran", place: 0, reward: 0 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "🦈Shark-Eyed...", place: 33, reward: 0 },
      { nick: "Бабник", place: 22, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "Em13!!", place: 2, reward: 7898 },
      { nick: "nikola233", place: 7, reward: 2002 },
      { nick: "АршакМкртчян", place: 0, reward: 0 },
      { nick: "Бардюр", place: 0, reward: 0 },
      { nick: "хер вам)))))", place: 10, reward: 0 }
    ] },
    { time: "16:00", name: "PLO4 🎴🎴 25K 🏆", buyin: 25000, league: 2, players: [
      { nick: "YuraK700", place: 8, reward: 1147 }
    ] },
    { time: "18:00", name: "Турнир Понедельника MKO 7MAX", buyin: 53000, league: 1, players: [
      { nick: "Бабник", place: 1, reward: 39540 },
      { nick: "Waaar", place: 4, reward: 3890 },
      { nick: "king00001", place: 5, reward: 13060 },
      { nick: "BlackJackovich", place: 6, reward: 6480 },
      { nick: "pitbulltip", place: 11, reward: 1720 }
    ] },
    { time: "20:00", name: "НОК KO", buyin: 21000, league: 1, players: [
      { nick: "Sokol", place: 3, reward: 8031.25 },
      { nick: "Waaar", place: 4, reward: 1350 },
      { nick: "king00001", place: 6, reward: 0 },
      { nick: "BlackJackovich", place: 11, reward: 0 },
      { nick: "pitbulltip", place: 15, reward: 0 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 250k", buyin: 20000, league: 1, players: [
      { nick: "shark_001", place: 1, reward: 44519 },
      { nick: "АршакМкртчян", place: 7, reward: 8504 },
      { nick: "odna.pluha", place: 15, reward: 2972 },
      { nick: "Simba33", place: 10, reward: 2216 },
      { nick: "nikola233", place: 0, reward: 350 }
    ] },
    { time: "22:00", name: "Energetik Tournament", buyin: 9400, league: 2, players: [
      { nick: "Tanechka", place: 1, reward: 5950 },
      { nick: "tatarin_1", place: 2, reward: 3560 },
      { nick: "TonniHalf😎", place: 4, reward: 0 },
      { nick: "Shkarubo", place: 5, reward: 0 },
      { nick: "LuckyBoom", place: 6, reward: 0 }
    ] }
  ],
  "07.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 🥊 150k", buyin: 20000, league: 1, players: [
      { nick: "odna.pluha", place: 7, reward: 7885 },
      { nick: "АршакМкртчян", place: 0, reward: 0 },
      { nick: "Proxor", place: 0, reward: 0 },
      { nick: "XP3936198", place: 0, reward: 0 },
      { nick: "Olegggaaa", place: 0, reward: 0 }
    ] },
    { time: "06:00", name: "Tai 7 🌊 1/2 KO 🎯 20k", buyin: 20000, league: 1, players: [
      { nick: "AndrushaMorf", place: 3, reward: 3514 },
      { nick: "nikola233", place: 4, reward: 17 },
      { nick: "хер вам)))))", place: 10, reward: 0 }
    ] },
    { time: "11:00", name: "Magic Bounty 🥊 60k", buyin: 10000, league: 2, players: [
      { nick: "YuraK700", place: 4, reward: 2654 },
      { nick: "Malek3084", place: 17, reward: 213 },
      { nick: "kabanchik", place: 0, reward: 0 },
      { nick: "outsider", place: 0, reward: 0 },
      { nick: "АршакМкртчян", place: 46, reward: 0 }
    ] },
    { time: "12:00", name: "DV 🦅 PLO5 🥊 30k 🥊", buyin: 20000, league: 1, players: [
      { nick: "♤PROFESSOR♤", place: 1, reward: 18765 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 16800, league: 1, players: [
      { nick: "BOTEZGAMBIT", place: 1, reward: 17000 },
      { nick: "FrankL", place: 3, reward: 6700 },
      { nick: "Waaar", place: 5, reward: 0 },
      { nick: "king00001", place: 9, reward: 0 },
      { nick: "MilkyWay77", place: 11, reward: 0 }
    ] },
    { time: "13:00", name: "DV 🦅 Bounty 🥊 150k", buyin: 10000, league: 1, players: [
      { nick: "Бардюр", place: 3, reward: 15318 },
      { nick: "АршакМкртчян", place: 0, reward: 0 },
      { nick: "Malek3084", place: 0, reward: 0 },
      { nick: "Бабник", place: 0, reward: 0 },
      { nick: "nikola233", place: 0, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "Рыбнадзор", place: 1, reward: 22211 },
      { nick: "nikola233", place: 7, reward: 855 },
      { nick: "siropchik", place: 0, reward: 0 },
      { nick: "АршакМкртчян", place: 0, reward: 0 },
      { nick: "Бардюр", place: 13, reward: 0 }
    ] },
    { time: "16:00", name: "PLO4 🃏🃏🃏 25K 🏆", buyin: 25000, league: 2, players: [
      { nick: "YuraK700", place: 5, reward: 2095 },
      { nick: "♤PROFESSOR♤", place: 8, reward: 1134 },
      { nick: "siropchik", place: 0, reward: 0 },
      { nick: "allex 1983", place: 0, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Вторника", buyin: 60900, league: 2, players: [
      { nick: "KamepuHa", place: 1, reward: 32370 },
      { nick: "mamalena", place: 3, reward: 9840 },
      { nick: "Shkarubo", place: 4, reward: 8640 },
      { nick: "Travolta0707", place: 9, reward: 2880 },
      { nick: "MilkyWay77", place: 11, reward: 1680 }
    ] },
    { time: "18:00", name: "BOUNTY MAGIC MKO MTT-NLH", buyin: 1000, league: 1, players: [
      { nick: "AndrushaMorf", place: 1, reward: 167788 },
      { nick: "🦈Shark-Eyed...", place: 21, reward: 0 },
      { nick: "siropchik", place: 69, reward: 0 },
      { nick: "Simba33", place: 0, reward: 0 },
      { nick: "АршакМкртчян", place: 79, reward: 0 }
    ] }
  ],
  "08.04.2026": [
    { time: "02:00", name: "Deep Night 20k", buyin: 10, league: 2, players: [
      { nick: "Leokampus", place: 3, reward: 2883 },
      { nick: "FizzBuzz", place: 18, reward: 0 },
      { nick: "хер вам)))))", place: 0, reward: 0 },
      { nick: "фел", place: 11, reward: 0 }
    ] },
    { time: "10:00", name: "DV Turbo 500 90K", buyin: 500, league: 1, players: [
      { nick: "Бэха", place: 1, reward: 5526 },
      { nick: "chazyiool", place: 0, reward: 0 },
      { nick: "хер вам)))))", place: 0, reward: 0 },
      { nick: "shockin", place: 28, reward: 0 },
      { nick: "🦈Shark-Eyed...", place: 36, reward: 0 }
    ] },
    { time: "11:00", name: "Magic Bounty 60k", buyin: 10000, league: 2, players: [
      { nick: "outsider", place: 4, reward: 4922 },
      { nick: "фел", place: 5, reward: 2606 },
      { nick: "odna.pluha", place: 12, reward: 4300 },
      { nick: "shockin", place: 35, reward: 0 },
      { nick: "ABevege", place: 69, reward: 0 }
    ] },
    { time: "13:00", name: "DV Bounty 150k PKO", buyin: 10000, league: 1, players: [
      { nick: "Рыбнадзор", place: 1, reward: 43843 },
      { nick: "Waaarr", place: 41, reward: 0 },
      { nick: "🦈Shark-Eyed...", place: 0, reward: 0 },
      { nick: "Бардюр", place: 42, reward: 0 },
      { nick: "хер вам)))))", place: 0, reward: 0 }
    ] },
    { time: "16:00", name: "PLO4 25K", buyin: 25000, league: 2, players: [
      { nick: "Sarmat1305", place: 3, reward: 4933 },
      { nick: "YuraK700", place: 24, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 12000, league: 1, players: [
      { nick: "FrankL", place: 1, reward: 25000 },
      { nick: "WiNifly", place: 5, reward: 0 },
      { nick: "Waaar", place: 7, reward: 0 },
      { nick: "Aposum", place: 11, reward: 0 },
      { nick: "EnotSimuran", place: 20, reward: 0 }
    ] },
    { time: "18:00", name: "Freeroll 1 MLN", buyin: 1000000, league: 1, players: [
      { nick: "Reebook", place: 7, reward: 30000 },
      { nick: "Фокс", place: 8, reward: 15500 },
      { nick: "Sereban", place: 14, reward: 10500 },
      { nick: "kashey", place: 199, reward: 0 },
      { nick: "WiNifly", place: 209, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Среды", buyin: 17400, league: 2, players: [
      { nick: "WiNifly", place: 2, reward: 8250 },
      { nick: "Malek3084", place: 4, reward: 4000 },
      { nick: "DmQa", place: 6, reward: 2950 },
      { nick: "TonniHalf", place: 7, reward: 2450 },
      { nick: "doss93", place: 12, reward: 1050 }
    ] },
    { time: "19:00", name: "PLO5 300", buyin: 300, league: 2, players: [
      { nick: "Sarmat1305", place: 4, reward: 3405 }
    ] },
    { time: "19:30", name: "Private 500", buyin: 60000, league: 1, players: [
      { nick: "TonniHalf", place: 1, reward: 20270 },
      { nick: "ПокерМанки", place: 2, reward: 13930 },
      { nick: "Adam1993", place: 3, reward: 7744 },
      { nick: "WiNifly", place: 4, reward: 5728 },
      { nick: "Prokopenya", place: 5, reward: 5981 }
    ] },
    { time: "22:00", name: "Magic 500 150K", buyin: 500, league: 1, players: [
      { nick: "Em13!!", place: 6, reward: 4736 },
      { nick: "AndrushaMorf", place: 103, reward: 0 },
      { nick: "GhooSt", place: 104, reward: 0 },
      { nick: "АршакМкртчян", place: 0, reward: 0 },
      { nick: "shockin", place: 0, reward: 0 }
    ] },
    { time: "23:00", name: "Night magic 100K", buyin: 100000, league: 1, players: [
      { nick: "Proxor", place: 5, reward: 5663 },
      { nick: "AndrushaMorf", place: 10, reward: 1887 },
      { nick: "Em13!!", place: 0, reward: 0 },
      { nick: "Бардюр", place: 0, reward: 0 }
    ] }
  ],
  "09.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 🥊 150k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 3, reward: 14400 },
      { nick: "odna.pluha", place: 11, reward: 2700 },
      { nick: "Рыбнадзор", place: 15, reward: 0 },
      { nick: "AndrushaMorf", place: 0, reward: 0 }
    ] },
    { time: "08:00", name: "Bali Yana 🌴🆕 30k", buyin: 10, league: 1, players: [
      { nick: "comotd", place: 2, reward: 3300 },
      { nick: "AndrushaMorf", place: 0, reward: 0 },
      { nick: "хер вам)))))", place: 15, reward: 0 },
      { nick: "shockin", place: 0, reward: 0 },
      { nick: "Бэха", place: 17, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 13600, league: 1, players: [
      { nick: "MilkyWay77", place: 2, reward: 11800 },
      { nick: "Y-gin", place: 8, reward: 0 },
      { nick: "FrankL", place: 9, reward: 0 },
      { nick: "KamepuHa", place: 10, reward: 0 },
      { nick: "BOTEZGAMBIT", place: 13, reward: 0 }
    ] },
    { time: "14:00", name: "Micro 200 🏆 70K GTD", buyin: 200, league: 2, players: [
      { nick: "Бэха", place: 1, reward: 18500 },
      { nick: "B5510B", place: 2, reward: 0 },
      { nick: "...Лёха...", place: 3, reward: 0 },
      { nick: "Malek3084", place: 4, reward: 0 },
      { nick: "outsider", place: 5, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 11200, league: 1, players: [
      { nick: "WiNifly", place: 2, reward: 12500 },
      { nick: "Waaar", place: 12, reward: 0 },
      { nick: "KamepuHa", place: 14, reward: 0 },
      { nick: "RUS22RUS", place: 20, reward: 0 },
      { nick: "EnotSimuran", place: 21, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Четверга", buyin: 64900, league: 1, players: [
      { nick: "Waaar", place: 4, reward: 20450 },
      { nick: "WiNifly", place: 6, reward: 6150 },
      { nick: "Rifa", place: 7, reward: 5200 },
      { nick: "ПокерМанки", place: 13, reward: 0 },
      { nick: "king00001", place: 14, reward: 0 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 250k", buyin: 20000, league: 1, players: [
      { nick: "Рыбнадзор", place: 7, reward: 6100 },
      { nick: "Em13!!", place: 54, reward: 0 },
      { nick: "AndrushaMorf", place: 0, reward: 0 },
      { nick: "comotd", place: 0, reward: 0 },
      { nick: "Бабник", place: 0, reward: 0 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 14700, league: 2, players: [
      { nick: "WiNifly", place: 1, reward: 12690 },
      { nick: "Ksuha🦎", place: 2, reward: 5030 },
      { nick: "DmQa", place: 4, reward: 1310 },
      { nick: "Tanechka", place: 5, reward: 1200 },
      { nick: "DemonDen", place: 7, reward: 0 }
    ] },
    { time: "23:00", name: "Night magic 100K 🌙", buyin: 100000, league: 1, players: [
      { nick: "Фокс", place: 8, reward: 3900 },
      { nick: "Em13!!", place: 10, reward: 2200 },
      { nick: "nachyn", place: 22, reward: 0 },
      { nick: "Рыбнадзор", place: 24, reward: 0 },
      { nick: "хасан ибн С", place: 31, reward: 0 }
    ] }
  ],
  "10.04.2026": [
    { time: "00:00", name: "X-Poker PLO6", buyin: 0, league: 2, players: [
      { nick: "Sarmat1305", place: 3, reward: 1800, points: 90 }
    ] },
    { time: "00:00", name: "S.Bounty 2/3 🥊 150k", buyin: 20000, league: 1, players: [
      { nick: "Рыбнадзор", place: 2, reward: 10800 },
      { nick: "Em13!!", place: 21, reward: 200 },
      { nick: "АршакМкртчян", place: 14, reward: 0 },
      { nick: "FizzBuzz", place: 0, reward: 0 },
      { nick: "shockin", place: 0, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 10400, league: 1, players: [
      { nick: "Waaar", place: 2, reward: 9000 },
      { nick: "MilkyWay77", place: 4, reward: 0 },
      { nick: "Ksuha", place: 5, reward: 0 },
      { nick: "Marishka", place: 12, reward: 0 }
    ] },
    { time: "15:00", name: "🔶6+ HOLD'EM 500🔶", buyin: 500, league: 1, players: [
      { nick: "Olegan393", place: 3, reward: 1500 },
      { nick: "versus", place: 0, reward: 0 },
      { nick: "kabanchik", place: 0, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 13600, league: 1, players: [
      { nick: "Rifa", place: 2, reward: 15000 },
      { nick: "Waaar", place: 4, reward: 0 },
      { nick: "FrankL", place: 8, reward: 0 },
      { nick: "ПокерМанки", place: 12, reward: 0 },
      { nick: "petroochoo", place: 16, reward: 0 }
    ] },
    { time: "18:00", name: "Пятница Прогрессив", buyin: 67500, league: 1, players: [
      { nick: "Rom4ik", place: 2, reward: 19854.92 },
      { nick: "AgroMonkey", place: 6, reward: 4998.59 },
      { nick: "Mr.V", place: 8, reward: 3976.24 },
      { nick: "kriak", place: 12, reward: 1170 },
      { nick: "Prokopenya", place: 13, reward: 1901.25 }
    ] },
    { time: "18:00", name: "NLH Bounty 400K 💵", buyin: 20000, league: 1, players: [
      { nick: "outsider", place: 2, reward: 58800 },
      { nick: "Бэха", place: 16, reward: 6100 },
      { nick: "Фокс", place: 51, reward: 0 },
      { nick: "Em13!!", place: 73, reward: 0 },
      { nick: "хасан ибн С", place: 0, reward: 0 }
    ] },
    { time: "22:00", name: "Magic 🎯 500 🎯 150K", buyin: 500, league: 1, players: [
      { nick: "AlenaSt", place: 2, reward: 14600 },
      { nick: "kriaks", place: 7, reward: 3100 },
      { nick: "АршакМкртчян", place: 32, reward: 0 },
      { nick: "doctor43", place: 0, reward: 0 },
      { nick: "хер вам)))))", place: 38, reward: 0 }
    ] }
  ],
  "11.04.2026": [
    { time: "00:00", name: "Два туза. Доллары (JACKPOT A)", buyin: 0, league: 1, players: [
      { nick: "4ezzi", place: 2, reward: 30130, points: 110 }
    ] },
    { time: "08:00", name: "Bali Yana 🌴🆕 30k", buyin: 10000, league: 2, players: [
      { nick: "AndrushaMorf", place: 3, reward: 1800 },
      { nick: "Бэха", place: 0, reward: 0 },
      { nick: "хер вам)))))", place: 0, reward: 0 }
    ] },
    { time: "12:00", name: "DV 🦅 PLO5 🥊 30k🥊", buyin: 20000, league: 1, players: [
      { nick: "Sarmat1305", place: 5, reward: 1300 },
      { nick: "🐱Mario.🐲", place: 11, reward: 0 },
      { nick: "kriaks", place: 0, reward: 0 },
      { nick: "хер вам)))))", place: 0, reward: 0 },
      { nick: "♤PROFESSOR♤", place: 0, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 16800, league: 1, players: [
      { nick: "Mr.V", place: 1, reward: 17700 },
      { nick: "Rom4ik", place: 4, reward: 0 },
      { nick: "Ksuha", place: 8, reward: 0 },
      { nick: "AgroMonkey", place: 9, reward: 0 },
      { nick: "FrankL", place: 12, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "биртман", place: 4, reward: 6600 },
      { nick: "Em13!!", place: 5, reward: 5100 },
      { nick: "AndrushaMorf", place: 10, reward: 0 },
      { nick: "АршакМкртчян", place: 0, reward: 0 },
      { nick: "Бэха", place: 17, reward: 0 }
    ] },
    { time: "17:00", name: "Rebuy", buyin: 12000, league: 1, players: [
      { nick: "Evgen.", place: 2, reward: 15000 },
      { nick: "Ksuha🦎", place: 3, reward: 10000 },
      { nick: "Waaar", place: 5, reward: 0 },
      { nick: "king00001", place: 6, reward: 0 },
      { nick: "FizzBuzz", place: 14, reward: 0 }
    ] },
    { time: "19:00", name: "Классический турнир 6MAX", buyin: 15500, league: 1, players: [
      { nick: "Prushnik", place: 1, reward: 11100 },
      { nick: "Чеб43", place: 3, reward: 4500 },
      { nick: "Рамиль01", place: 4, reward: 3600 },
      { nick: "Shkarubo", place: 5, reward: 3300 },
      { nick: "FizzBuzz", place: 8, reward: 0 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 14100, league: 2, players: [
      { nick: "DmQa", place: 1, reward: 8960 },
      { nick: "WiNifly", place: 2, reward: 5900 },
      { nick: "tatarin_1", place: 4, reward: 1240 },
      { nick: "GhooSt", place: 5, reward: 2260 },
      { nick: "ШЛЯПАУСАТ", place: 6, reward: 900 }
    ] },
    { time: "23:00", name: "Night magic 100K 🌙", buyin: 100000, league: 1, players: [
      { nick: "Em13!!", place: 7, reward: 3900 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "Фокс", place: 0, reward: 0 }
    ] }
  ],
  "12.04.2026": [
    { time: "08:00", name: "Bali Yana🌴🆕 30k", buyin: 10000, league: 1, players: [
      { nick: "shockin", place: 3, reward: 3700 },
      { nick: "Бэха", place: 0, reward: 0 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 200, league: 2, players: [
      { nick: "kriaks", place: 4, reward: 1500 },
      { nick: "Sarmat1305", place: 5, reward: 300 },
      { nick: "shockin", place: 0, reward: 0 }
    ] },
    { time: "10:00", name: "DV Turbo 500 🏆 90K", buyin: 500, league: 1, players: [
      { nick: "Фокс", place: 5, reward: 6000 },
      { nick: "shockin", place: 0, reward: 0 },
      { nick: "Рыбнадзор", place: 10, reward: 0 },
      { nick: "Em13!!", place: 15, reward: 0 },
      { nick: "AlenaSt", place: 16, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 20240, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 18000 },
      { nick: "FrankL", place: 4, reward: 0 },
      { nick: "Mr.V", place: 11, reward: 0 },
      { nick: "Neo777", place: 12, reward: 0 }
    ] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 4800, league: 2, players: [
      { nick: "Malek3084", place: 3, reward: 1620 },
      { nick: "ШЛЯПАУСАТ", place: 4, reward: 0 },
      { nick: "Чеб43", place: 5, reward: 0 },
      { nick: "FridaKahlo", place: 6, reward: 0 },
      { nick: "kriak", place: 7, reward: 0 }
    ] },
    { time: "18:00", name: "MAIN 2,5M GTD", buyin: 20000, league: 1, players: [
      { nick: "Рыбнадзор", place: 13, reward: 16100 },
      { nick: "AndrushaMorf", place: 69, reward: 3500 },
      { nick: "WhiskeyClub", place: 0, reward: 0 },
      { nick: "outsider", place: 0, reward: 0 },
      { nick: "idinaxyi", place: 0, reward: 0 }
    ] },
    { time: "18:00", name: "Воскресный турнир", buyin: 118000, league: 1, players: [
      { nick: "ПокерМанки", place: 2, reward: 53519 },
      { nick: "Mr.V", place: 8, reward: 10267 },
      { nick: "Evgen.", place: 14, reward: 7138 },
      { nick: "Em13", place: 11, reward: 7025 },
      { nick: "Proxor", place: 18, reward: 3600 }
    ] },
    { time: "19:00", name: "Классический турнир 6MAX", buyin: 21000, league: 1, players: [
      { nick: "WiNifly", place: 3, reward: 5000 },
      { nick: "Палач", place: 4, reward: 3660 },
      { nick: "PONOCHKA", place: 5, reward: 2990 },
      { nick: "Shkarubo", place: 6, reward: 2660 },
      { nick: "DmQa", place: 7, reward: 0 }
    ] },
    { time: "20:00", name: "PLO5 300", buyin: 300, league: 2, players: [
      { nick: "Sarmat1305", place: 3, reward: 3500 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 5400, league: 2, players: [
      { nick: "Ksuha", place: 1, reward: 9800 },
      { nick: "Malek3084", place: 4, reward: 0 },
      { nick: "ДжекПотный", place: 5, reward: 0 },
      { nick: "⚡️72⚡️", place: 6, reward: 0 },
      { nick: "SunRise", place: 7, reward: 0 }
    ] },
    { time: "21:59", name: "Magic 🎯 500 🎯 150K", buyin: 500, league: 1, players: [
      { nick: "AlenaSt", place: 2, reward: 27600 },
      { nick: "outsider", place: 61, reward: 0 },
      { nick: "Lastrada911", place: 0, reward: 0 }
    ] },
    { time: "22:00", name: "Energetik Tournament", buyin: 7800, league: 2, players: [
      { nick: "Shkarubo", place: 2, reward: 3000 },
      { nick: "KamepuHa", place: 3, reward: 2000 },
      { nick: "Палач", place: 4, reward: 0 },
      { nick: "PONOCHKA", place: 5, reward: 0 },
      { nick: "Чеб43", place: 6, reward: 0 }
    ] }
  ],
  "13.04.2026": [
    { time: "06:00", name: "Tai 7 🌊 1/2 KO 🎯 20k", buyin: 20000, league: 1, players: [
      { nick: "хер вам)))))", place: 2, reward: 4200 },
      { nick: "Stifler", place: 3, reward: 3800 },
      { nick: "nikola233", place: 0, reward: 200 },
      { nick: "AndrushaMorf", place: 0, reward: 0 },
      { nick: "Фокс", place: 5, reward: 0 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$ PKO", buyin: 200, league: 2, players: [
      { nick: "Sarmat1305", place: 5, reward: 1600 },
      { nick: "comotd", place: 0, reward: 0 },
      { nick: "Deni1210", place: 0, reward: 0 },
      { nick: "nikola233", place: 0, reward: 0 },
      { nick: "...Лёха...", place: 0, reward: 0 }
    ] },
    { time: "10:00", name: "DV Turbo 500 🏆 90K", buyin: 500, league: 1, players: [
      { nick: "Откотика_Я", place: 1, reward: 24800 },
      { nick: "Em13!!", place: 3, reward: 9500 },
      { nick: "Рыбнадзор", place: 10, reward: 1200 },
      { nick: "...Лёха...", place: 29, reward: 0 },
      { nick: "Sarmat1305", place: 26, reward: 0 }
    ] },
    { time: "11:00", name: "Magic Bounty 🥊 60k", buyin: 10000, league: 2, players: [
      { nick: "AlenaSt", place: 6, reward: 5200 },
      { nick: "outsider", place: 0, reward: 0 },
      { nick: "Stifler", place: 47, reward: 0 },
      { nick: "Откотика_Я", place: 48, reward: 0 },
      { nick: "хер вам)))))", place: 57, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 24000, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 19100 },
      { nick: "Евгений.А", place: 3, reward: 7600 },
      { nick: "COBRA", place: 4, reward: 0 },
      { nick: "Evgen.", place: 10, reward: 0 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 24000, league: 2, players: [
      { nick: "Waaar", place: 1, reward: 19100 },
      { nick: "Евгений.А", place: 3, reward: 7600 },
      { nick: "COBRA", place: 4, reward: 0 },
      { nick: "Evgen.", place: 10, reward: 0 }
    ] },
    { time: "13:00", name: "DV 🦅 Bounty 🥊 150k", buyin: 10000, league: 1, players: [
      { nick: "nikola233", place: 4, reward: 9900 },
      { nick: "Бардюр", place: 15, reward: 1100 },
      { nick: "Рыбнадзор", place: 0, reward: 0 },
      { nick: "АршакМкртчян", place: 0, reward: 0 },
      { nick: "outsider", place: 0, reward: 0 }
    ] },
    { time: "14:00", name: "Bounty 200🥊 70K GTD", buyin: 200, league: 2, players: [
      { nick: "AlenaSt", place: 6, reward: 1600 },
      { nick: "Дмитрий", place: 10, reward: 1000 },
      { nick: "Jindaniels", place: 0, reward: 0 },
      { nick: "kabanchik", place: 0, reward: 0 },
      { nick: "БуГаГа", place: 0, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "биртман", place: 3, reward: 5000 },
      { nick: "Бардюр", place: 9, reward: 100 },
      { nick: "kabanchik", place: 0, reward: 0 },
      { nick: "Em13!!", place: 0, reward: 0 },
      { nick: "nikola233", place: 0, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Понедельника MKO 7MAX", buyin: 78000, league: 1, players: [
      { nick: "Tanechka", place: 1, reward: 36045 },
      { nick: "Waaar", place: 2, reward: 10540 },
      { nick: "Coo1er91", place: 3, reward: 4750 },
      { nick: "MOJO", place: 5, reward: 4490 },
      { nick: "Rifa", place: 6, reward: 3110 }
    ] },
    { time: "18:00", name: "Monday 🏆 250k GT", buyin: 5000, league: 1, players: [
      { nick: "AndrushaMorf", place: 4, reward: 18500 },
      { nick: "AlenaSt", place: 20, reward: 1600 },
      { nick: "Mogli", place: 110, reward: 0 },
      { nick: "пупсик", place: 0, reward: 0 },
      { nick: "Бабник", place: 0, reward: 0 }
    ] },
    { time: "19:00", name: "Классический турнир 6MAX", buyin: 17000, league: 1, players: [
      { nick: "KamepuHa", place: 2, reward: 7500 },
      { nick: "FridaKahlo", place: 3, reward: 4500 },
      { nick: "Deni0214", place: 6, reward: 0 },
      { nick: "PONOCHKA", place: 8, reward: 0 },
      { nick: "MilkyWay77", place: 9, reward: 0 }
    ] },
    { time: "20:00", name: "💎Hyper Turbo 300💎", buyin: 300, league: 2, players: [
      { nick: "AlenaSt", place: 6, reward: 3900 },
      { nick: "YuraK700", place: 7, reward: 2900 },
      { nick: "WiNifly", place: 32, reward: 0 },
      { nick: "odna.pluha", place: 76, reward: 0 },
      { nick: "Sarmat1305", place: 83, reward: 0 }
    ] },
    { time: "21:00", name: "MKO 7MAX", buyin: 16500, league: 2, players: [
      { nick: "WiNifly", place: 1, reward: 14985 },
      { nick: "Tanechka", place: 2, reward: 2735 },
      { nick: "DmQa", place: 4, reward: 1310 },
      { nick: "kream89", place: 6, reward: 0 }
    ] },
    { time: "22:00", name: "Energetik Tournament", buyin: 11600, league: 2, players: [
      { nick: "Tanechka", place: 1, reward: 7530 },
      { nick: "tatarin_1", place: 2, reward: 5090 },
      { nick: "KamepuHa", place: 3, reward: 3050 },
      { nick: "kream89", place: 4, reward: 2440 },
      { nick: "Палач", place: 7, reward: 0 }
    ] }
  ],
  "14.04.2026": [
    { time: "12:00", name: "DV Rebuy", buyin: 800, league: 1, players: [
      { nick: "king00001", place: 3, reward: 7900 },
      { nick: "FrankL", place: 5, reward: 0 },
      { nick: "VOSOvec", place: 7, reward: 0 },
      { nick: "Waaar", place: 10, reward: 0 },
      { nick: "Bylochka😉", place: 16, reward: 0 }
    ] },
    { time: "17:00", name: "Classic Tournament", buyin: 500, league: 1, players: [
      { nick: "MilkyWay77", place: 2, reward: 7500 },
      { nick: "Чеб643", place: 3, reward: 4500 },
      { nick: "WiNifly", place: 4, reward: 3600 },
      { nick: "Prushnik", place: 10, reward: 0 },
      { nick: "tatarin_1", place: 11, reward: 0 }
    ] },
    { time: "18:00", name: "BOUNTY MAGIC 400K", buyin: 10000, league: 1, players: [
      { nick: "nikola233", place: 7, reward: 11609 },
      { nick: "AndrushaMorf", place: 37, reward: 967 }
    ] },
    { time: "18:00", name: "Турнир Вторника", buyin: 42300, league: 2, players: [
      { nick: "WiNifly", place: 2, reward: 17100 },
      { nick: "kriak", place: 5, reward: 6600 },
      { nick: "AlenaSt", place: 6, reward: 5500 },
      { nick: "AliPetuhov", place: 11, reward: 1600 },
      { nick: "AliySvin", place: 12, reward: 1600 }
    ] },
    { time: "20:00", name: "💎Hyper Turbo 300💎", buyin: 300, league: 2, players: [
      { nick: "Em13!!", place: 2, reward: 11455 },
      { nick: "YuraK700", place: 7, reward: 2484 },
      { nick: "Бабник", place: 8, reward: 1303 },
      { nick: "AlenaSt", place: 13, reward: 648 },
      { nick: "Sarmat1305", place: 18, reward: 575 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 220k", buyin: 20000, league: 1, players: [
      { nick: "Asta la Vista", place: 3, reward: 16694 },
      { nick: "outsider", place: 5, reward: 12346 },
      { nick: "WhiskeyClub", place: 30, reward: 4103 },
      { nick: "Shark-Eyed...", place: 0, reward: 2500 },
      { nick: "Em13!!", place: 22, reward: 1716 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 10200, league: 2, players: [
      { nick: "tatarin_1", place: 1, reward: 8930 },
      { nick: "Tanechka", place: 2, reward: 3050 },
      { nick: "XORTYRETSKOGO", place: 3, reward: 1200 },
      { nick: "Shkarubo", place: 4, reward: 950 },
      { nick: "абыРвалГ", place: 5, reward: 870 }
    ] },
    { time: "22:00", name: "Energetik Tournament", buyin: 8000, league: 2, players: [
      { nick: "FridaKahlo", place: 1, reward: 6670 },
      { nick: "Чеб43", place: 2, reward: 3990 },
      { nick: "Tanechka", place: 3, reward: 2660 },
      { nick: "tatarin_1", place: 4, reward: 0 },
      { nick: "Shkarubo", place: 5, reward: 0 }
    ] }
  ],
  "15.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 120k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 8, reward: 2941 }
    ] },
    { time: "11:00", name: "Magic Bounty 50k", buyin: 10000, league: 2, players: [
      { nick: "PIRANJA19", place: 1, reward: 24916 },
      { nick: "AlenaSt", place: 3, reward: 6991 },
      { nick: "Em13!!", place: 5, reward: 6922 }
    ] },
    { time: "17:00", name: "Classic Tournament", buyin: 14000, league: 1, players: [
      { nick: "VOSOvec", place: 2, reward: 7500 },
      { nick: "FridaKahlo", place: 5, reward: 3300 },
      { nick: "Рамиль01", place: 6, reward: 0 },
      { nick: "WiNifly", place: 7, reward: 0 },
      { nick: "Евгений.А", place: 8, reward: 0 }
    ] },
    { time: "18:00", name: "💎Freeroll💎1 MLN", buyin: 10000, league: 1, players: [
      { nick: "Pasiki_Koliki", place: 5, reward: 52500 },
      { nick: "Фокс", place: 10, reward: 7000 },
      { nick: "XP3157488", place: 35, reward: 4100 },
      { nick: "WhiskeyClub", place: 27, reward: 3100 },
      { nick: "Provincial", place: 54, reward: 2600 }
    ] },
    { time: "18:00", name: "Турнир Среды", buyin: 26100, league: 2, players: [
      { nick: "doss93", place: 1, reward: 14870 },
      { nick: "tatarin_1", place: 5, reward: 3350 },
      { nick: "zagrebnagreb", place: 8, reward: 1600 },
      { nick: "мистерFox", place: 10, reward: 960 },
      { nick: "Timon9419", place: 11, reward: 910 }
    ] },
    { time: "20:00", name: "💎Hyper Turbo 300💎", buyin: 300, league: 2, players: [
      { nick: "Shark-Eyed...", place: 2, reward: 8889 },
      { nick: "WiNifly", place: 8, reward: 1585 },
      { nick: "AlenaSt", place: 13, reward: 607 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 13200, league: 2, players: [
      { nick: "Tanechka", place: 2, reward: 5830 },
      { nick: "DmQa", place: 3, reward: 1130 },
      { nick: "SantaClauS", place: 4, reward: 1730 },
      { nick: "tatarin_1", place: 5, reward: 830 },
      { nick: "Ksuha🦎", place: 7, reward: 0 }
    ] },
    { time: "22:00", name: "Energetik Tournament", buyin: 10600, league: 2, players: [
      { nick: "Ksuha🦎", place: 1, reward: 4200 },
      { nick: "MilkyWay77", place: 2, reward: 2840 },
      { nick: "WiNifly", place: 4, reward: 1360 },
      { nick: "Tanechka", place: 5, reward: 1240 },
      { nick: "мистерFox", place: 6, reward: 0 }
    ] },
    { time: "23:00", name: "Night magic 80K", buyin: 20000, league: 1, players: [
      { nick: "AndrushaMorf", place: 2, reward: 45437 }
    ] }
  ],
  "16.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 120k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 6, reward: 6076 },
      { nick: "AndrushaMorf", place: 0, reward: 1106 }
    ] },
    { time: "06:00", name: "Tai 7 1/2 KO 15k", buyin: 10000, league: 1, players: [
      { nick: "Evgen1722", place: 3, reward: 871 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 10000, league: 2, players: [
      { nick: "Sarmat1305", place: 3, reward: 1665 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 12800, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 15000 },
      { nick: "Ksuha🦎", place: 6, reward: 0 },
      { nick: "MilkyWay77", place: 8, reward: 0 },
      { nick: "FrankL", place: 9, reward: 0 },
      { nick: "stafart", place: 11, reward: 0 }
    ] },
    { time: "13:00", name: "DV Bounty 100k", buyin: 10000, league: 1, players: [
      { nick: "AlenaSt", place: 1, reward: 39919 },
      { nick: "Evgen1722", place: 12, reward: 2100 }
    ] },
    { time: "14:00", name: "Micro 200 50K GTD", buyin: 200, league: 2, players: [
      { nick: "Malek3084", place: 2, reward: 9928 },
      { nick: "ABevege", place: 16, reward: 618 },
      { nick: "B551OB", place: 15, reward: 88 }
    ] },
    { time: "16:00", name: "PLO4 20K", buyin: 10000, league: 2, players: [
      { nick: "Sarmat1305", place: 2, reward: 4319 }
    ] },
    { time: "17:00", name: "Classic Tournament", buyin: 17500, league: 1, players: [
      { nick: "Waaar", place: 2, reward: 6600 },
      { nick: "AlenaSt", place: 5, reward: 2700 },
      { nick: "FrankL", place: 8, reward: 0 },
      { nick: "WiNifly", place: 11, reward: 0 },
      { nick: "MilkyWay77", place: 12, reward: 0 }
    ] },
    { time: "18:00", name: "Турнир Четверга 🏆", buyin: 57000, league: 1, players: [
      { nick: "WiNifly", place: 1, reward: 58700 },
      { nick: "Waaar", place: 2, reward: 24400 },
      { nick: "FrankL", place: 6, reward: 6200 },
      { nick: "Em13", place: 7, reward: 5300 },
      { nick: "ПокерМанки", place: 10, reward: 0 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 220k", buyin: 20000, league: 1, players: [
      { nick: "Asta la Vista", place: 8, reward: 8544 },
      { nick: "Откотика_Я", place: 26, reward: 5547 },
      { nick: "Malek3084", place: 21, reward: 3918 },
      { nick: "Бабник", place: 25, reward: 2468 },
      { nick: "Simba33", place: 29, reward: 1597 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 11400, league: 2, players: [
      { nick: "PlayerHyeEr", place: 3, reward: 1740 },
      { nick: "WiNifly", place: 8, reward: 0 },
      { nick: "Ksuha🦎", place: 12, reward: 0 },
      { nick: "Shkarubo", place: 13, reward: 0 },
      { nick: "Sarmat1305", place: 14, reward: 0 }
    ] },
    { time: "22:00", name: "Energetik Tournament", buyin: 9800, league: 2, players: [
      { nick: "AlenaSt", place: 1, reward: 4600 },
      { nick: "Sarmat1305", place: 3, reward: 1860 },
      { nick: "Shkarubo", place: 4, reward: 1490 },
      { nick: "DmQa", place: 6, reward: 0 },
      { nick: "WiNifly", place: 7, reward: 0 }
    ] },
    { time: "23:00", name: "Night magic 80K", buyin: 20000, league: 1, players: [
      { nick: "Фокс", place: 4, reward: 42303 }
    ] }
  ],
  "17.04.2026": [
    { time: "00:00", name: "Два туза. Доллары (JACKPOT B)", buyin: 0, league: 1, players: [
      { nick: "Waaar", place: 2, reward: 19550, points: 110 }
    ] },
    { time: "00:00", name: "S.Bounty 2/3 120k", buyin: 20000, league: 1, players: [
      { nick: "биртман", place: 7, reward: 11675 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 10000, league: 2, players: [
      { nick: "Sarmat1305", place: 5, reward: 1192 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 8800, league: 1, players: [
      { nick: "Waaar", place: 2, reward: 9000 },
      { nick: "VOSOvec", place: 9, reward: 0 },
      { nick: "Andrei350", place: 11, reward: 0 },
      { nick: "Ферапонт", place: 12, reward: 0 },
      { nick: "divanSHark", place: 13, reward: 0 }
    ] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 20000, league: 2, players: [
      { nick: "Sarmat1305", place: 2, reward: 7780 }
    ] },
    { time: "13:00", name: "DV Bounty 100k", buyin: 10000, league: 1, players: [
      { nick: "Evgen1722", place: 2, reward: 15980 },
      { nick: "Бардюр", place: 15, reward: 3042 }
    ] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 3700, league: 2, players: [
      { nick: "zagrebnagreb", place: 1, reward: 2570 },
      { nick: "Ферапонт", place: 2, reward: 1740 },
      { nick: "Tanechka", place: 5, reward: 760 },
      { nick: "tatarin_1", place: 8, reward: 0 },
      { nick: "Анубис", place: 9, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "хер вам))))", place: 4, reward: 3898 },
      { nick: "nikola233", place: 9, reward: 315 }
    ] },
    { time: "18:00", name: "Пятница Прогрессив", buyin: 55500, league: 1, players: [
      { nick: "Y-gin", place: 1, reward: 27001.9 },
      { nick: "WiNifly", place: 2, reward: 18135.48 },
      { nick: "TonniHalf😎", place: 7, reward: 4263.59 },
      { nick: "ПокерМанки", place: 8, reward: 2802.5 },
      { nick: "Tanechka", place: 11, reward: 225 }
    ] },
    { time: "19:00", name: "💸Big evening💰", buyin: 92400, league: 1, players: [
      { nick: "doss93", place: 1, reward: 67800 },
      { nick: "AliySvin", place: 3, reward: 26500 },
      { nick: "ПокерМанки", place: 8, reward: 11000 },
      { nick: "mamalena", place: 15, reward: 0 },
      { nick: "WiNifly", place: 16, reward: 0 }
    ] },
    { time: "19:00", name: "PLO5 300", buyin: 300, league: 2, players: [
      { nick: "Sarmat1305", place: 3, reward: 2337 }
    ] },
    { time: "20:00", name: "💎Hyper Turbo 300💎", buyin: 300, league: 2, players: [
      { nick: "AlenaSt", place: 1, reward: 24057 }
    ] },
    { time: "22:00", name: "Energetik Tournament", buyin: 9200, league: 2, players: [
      { nick: "PlayerHyeEr", place: 2, reward: 4420 },
      { nick: "VOSOvec", place: 4, reward: 2110 },
      { nick: "Tanechka", place: 7, reward: 0 },
      { nick: "tatarin_1", place: 8, reward: 0 },
      { nick: "WiNifly", place: 11, reward: 0 }
    ] }
  ],
  "18.04.2026": [
    { time: "08:00", name: "Два туза. Доллары (CRAZY)", buyin: 0, league: 1, players: [
      { nick: "Waaar", place: 4, reward: 16330, points: 70 }
    ] },
    { time: "00:00", name: "S.Bounty 2/3 120k", buyin: 20000, league: 1, players: [
      { nick: "Бардюр", place: 3, reward: 5059 }
    ] },
    { time: "02:00", name: "Deep Night 15k", buyin: 10000, league: 2, players: [
      { nick: "Жуля", place: 4, reward: 2038 }
    ] },
    { time: "10:00", name: "DV Turbo 500 60K", buyin: 10000, league: 1, players: [
      { nick: "nikola233", place: 8, reward: 2574 }
    ] },
    { time: "11:00", name: "Magic Bounty 50k", buyin: 10000, league: 2, players: [
      { nick: "Julia Shish", place: 7, reward: 1296 }
    ] },
    { time: "16:00", name: "HOLDEM 6+ GTD 30K", buyin: 10000, league: 1, players: [
      { nick: "arxitektor", place: 1, reward: 15300 },
      { nick: "shockin", place: 3, reward: 6720 }
    ] },
    { time: "19:00", name: "💸Big evening💰", buyin: 74800, league: 1, players: [
      { nick: "AliySvin", place: 2, reward: 44000 },
      { nick: "PlayerFD6762", place: 4, reward: 22000 },
      { nick: "VOSOvec", place: 9, reward: 0 },
      { nick: "Y-gin", place: 12, reward: 0 },
      { nick: "Waaar", place: 17, reward: 0 }
    ] },
    { time: "20:00", name: "💎Hyper Turbo 300💎", buyin: 300, league: 2, players: [
      { nick: "Julia Shish", place: 4, reward: 4132 }
    ] },
    { time: "20:00", name: "Tournament PLO4", buyin: 8700, league: 2, players: [
      { nick: "TonniHalf😎", place: 1, reward: 5950 },
      { nick: "Sarmat1305", place: 3, reward: 2370 },
      { nick: "jokerAA", place: 4, reward: 0 },
      { nick: "kriak", place: 5, reward: 0 },
      { nick: "KamepuHa", place: 7, reward: 0 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 220k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 6, reward: 7051 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 12300, league: 2, players: [
      { nick: "Tanechka", place: 1, reward: 13205 },
      { nick: "YOUAREMYDONKEY", place: 4, reward: 1145 },
      { nick: "tatarin_1", place: 6, reward: 830 },
      { nick: "PONOCHKA", place: 8, reward: 0 },
      { nick: "PlayerHyeEr", place: 9, reward: 0 }
    ] }
  ],
  "19.04.2026": [
    { time: "00:00", name: "Два туза. Доллары (FAST CRAZY)", buyin: 0, league: 1, players: [
      { nick: "4ezzi", place: 2, reward: 26680, points: 110 }
    ] },
    { time: "10:00", name: "DV Turbo 500 60K", buyin: 10000, league: 1, players: [
      { nick: "Фокс", place: 5, reward: 6630 }
    ] },
    { time: "11:00", name: "Magic Bounty 50k", buyin: 10000, league: 2, players: [
      { nick: "AlenaSt", place: 4, reward: 4561 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 21600, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 16300 },
      { nick: "king00001", place: 3, reward: 6400 },
      { nick: "TonniHalf😎", place: 7, reward: 0 },
      { nick: "VOSOvec", place: 8, reward: 0 },
      { nick: "Евгений.А", place: 9, reward: 0 }
    ] },
    { time: "18:00", name: "Воскресный турнир 🏆", buyin: 150000, league: 1, players: [
      { nick: "Mr.V", place: 4, reward: 14675 },
      { nick: "WiNifly", place: 9, reward: 4400 },
      { nick: "TonniHalf😎", place: 11, reward: 3650 },
      { nick: "Waaar", place: 12, reward: 6462.5 },
      { nick: "PlayerFD6762", place: 13, reward: 4325 }
    ] },
    { time: "20:00", name: "Tournament PLO4", buyin: 13200, league: 2, players: [
      { nick: "AlenaSt", place: 2, reward: 5020 },
      { nick: "Tanechka", place: 4, reward: 0 },
      { nick: "tatarin_1", place: 5, reward: 0 },
      { nick: "Sarmat1305", place: 6, reward: 0 },
      { nick: "Y-gin", place: 7, reward: 0 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 13800, league: 2, players: [
      { nick: "DmQa", place: 1, reward: 10170 },
      { nick: "T-150", place: 2, reward: 4270 },
      { nick: "Tanechka", place: 3, reward: 1340 },
      { nick: "viktor200688", place: 4, reward: 1060 },
      { nick: "XORTYRETSKOGO", place: 5, reward: 980 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 220k", buyin: 20000, league: 1, players: [
      { nick: "billionaire999", place: 8, reward: 6330 }
    ] }
  ],
  "20.04.2026": [
    { time: "00:00", name: "Два туза. Доллары (DEEP FREEZE)", buyin: 0, league: 1, players: [
      { nick: "Waaar", place: 2, reward: 42090, points: 110 }
    ] },
    { time: "14:00", name: "Два туза. Доллары (WOW MYSTERY)", buyin: 0, league: 1, players: [
      { nick: "Waaar", place: 3, reward: 6670, points: 90 }
    ] },
    { time: "10:00", name: "DV Turbo 500 60K", buyin: 10000, league: 1, players: [
      { nick: "Откотика_Я", place: 8, reward: 2571 }
    ] },
    { time: "11:00", name: "Magic Bounty 50k", buyin: 10000, league: 2, players: [
      { nick: "хер вам))))", place: 4, reward: 4630 }
    ] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 20000, league: 1, players: [
      { nick: "Sarmat1305", place: 6, reward: 1129 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 16800, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 15000 },
      { nick: "FrankL", place: 2, reward: 9000 },
      { nick: "VOSOvec", place: 4, reward: 0 },
      { nick: "Witch", place: 6, reward: 0 },
      { nick: "Rom4ik", place: 8, reward: 0 }
    ] },
    { time: "13:00", name: "DV Bounty 100k", buyin: 10000, league: 1, players: [
      { nick: "хер вам))))", place: 3, reward: 10304 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "Em13!!", place: 1, reward: 28871 }
    ] },
    { time: "18:00", name: "Турнир Понедельника", buyin: 64500, league: 1, players: [
      { nick: "абыРвалГ", place: 1, reward: 46250 },
      { nick: "Waaar", place: 2, reward: 20050 },
      { nick: "AlenaSt", place: 4, reward: 5760 },
      { nick: "kream89", place: 6, reward: 4470 },
      { nick: "XORTYRETSKOGO", place: 8, reward: 3020 }
    ] },
    { time: "19:00", name: "PLO5 300", buyin: 10000, league: 2, players: [
      { nick: "Sarmat1305", place: 6, reward: 2162 }
    ] },
    { time: "19:00", name: "💸Big evening💰", buyin: 66000, league: 1, players: [
      { nick: "AliPetuhov", place: 2, reward: 44000 },
      { nick: "WiNifly", place: 8, reward: 0 },
      { nick: "Rifa", place: 12, reward: 0 },
      { nick: "ПокерМанки", place: 14, reward: 0 },
      { nick: "Waaar", place: 16, reward: 0 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 220k", buyin: 20000, league: 1, players: [
      { nick: "nikola233", place: 4, reward: 11991 },
      { nick: "Бабник", place: 0, reward: 800 },
      { nick: "sudamov21", place: 18, reward: 61 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 11100, league: 2, players: [
      { nick: "Tanechka", place: 1, reward: 10170 },
      { nick: "tatarin_1", place: 2, reward: 4920 },
      { nick: "WiNifly", place: 4, reward: 1230 },
      { nick: "мистерFox", place: 6, reward: 0 },
      { nick: "DmQa", place: 7, reward: 0 }
    ] },
    { time: "22:00", name: "Magic 500 120K", buyin: 10000, league: 1, players: [
      { nick: "AlenaSt", place: 3, reward: 17790 }
    ] },
    { time: "23:00", name: "Night magic 80K", buyin: 20000, league: 1, players: [
      { nick: "billionaire999", place: 6, reward: 1625 }
    ] }
  ],
  "21.04.2026": [
    { time: "00:00", name: "Два туза. Доллары (CRAZY)", buyin: 0, league: 1, players: [
      { nick: "Waaar", place: 5, reward: 12420, points: 60 }
    ] },
    { time: "02:00", name: "Deep Night 15k", buyin: 10000, league: 2, players: [
      { nick: "ДомСоветов", place: 3, reward: 3423 },
      { nick: "Бардюр", place: 5, reward: 1805 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 10000, league: 2, players: [
      { nick: "Sarmat1305", place: 3, reward: 2250 },
      { nick: "undertaker", place: 13, reward: 815 }
    ] },
    { time: "09:00", name: "X-Poker PLO6", buyin: 0, league: 2, players: [
      { nick: "Sarmat1305", place: 3, reward: 1900, points: 90 }
    ] },
    { time: "12:00", name: "DV PLO5 30k", buyin: 20000, league: 1, players: [
      { nick: "Sarmat1305", place: 2, reward: 4216 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 12800, league: 1, players: [
      { nick: "VOSOvec", place: 2, reward: 12560 },
      { nick: "MilkyWay77", place: 6, reward: 0 },
      { nick: "Waaar", place: 8, reward: 0 },
      { nick: "абыРвалГ", place: 11, reward: 0 },
      { nick: "Просто", place: 16, reward: 0 }
    ] },
    { time: "14:00", name: "Micro 200 50K GTD", buyin: 10000, league: 2, players: [
      { nick: "Annie1609", place: 7, reward: 2469 }
    ] },
    { time: "14:00", name: "X-Poker NLH", buyin: 0, league: 2, players: [
      { nick: "Sarmat1305", place: 7, reward: 3200, points: 0 }
    ] },
    { time: "14:00", name: "X-Poker PLO4", buyin: 0, league: 2, players: [
      { nick: "Sarmat1305", place: 4, reward: 4300, points: 70 }
    ] },
    { time: "18:00", name: "Турнир Вторника", buyin: 37800, league: 2, players: [
      { nick: "doss93", place: 1, reward: 29000 },
      { nick: "Shkarubo", place: 3, reward: 8900 },
      { nick: "Dins", place: 4, reward: 7900 },
      { nick: "WiNifly", place: 9, reward: 2900 },
      { nick: "абыРвалГ", place: 11, reward: 2100 }
    ] },
    { time: "21:00", name: "NLH KNOCKOUT 220k", buyin: 20000, league: 1, players: [
      { nick: "хер вам))))", place: 1, reward: 48175 },
      { nick: "billionaire999", place: 0, reward: 350 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 11100, league: 2, players: [
      { nick: "VOSOvec", place: 1, reward: 10730 },
      { nick: "ДжекПотный", place: 2, reward: 1960 },
      { nick: "zagrebnagreb", place: 4, reward: 930 },
      { nick: "Tanechka", place: 5, reward: 860 },
      { nick: "XORTYRETSKOGO", place: 6, reward: 0 }
    ] },
    { time: "23:00", name: "Night magic 80K", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 3, reward: 5793 }
    ] }
  ],
  "22.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 120k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 1, reward: 63317 }
    ] },
    { time: "06:00", name: "Tai 7 1/2 KO 15k", buyin: 10000, league: 1, players: [
      { nick: "AlenaSt", place: 3, reward: 4466 }
    ] },
    { time: "08:00", name: "Bali Yana 20k", buyin: 10000, league: 1, players: [
      { nick: "Evgen1722", place: 1, reward: 20881 }
    ] },
    { time: "15:00", name: "6+ HOLD’EM 500", buyin: 10000, league: 1, players: [
      { nick: "AndrushaMorf", place: 1, reward: 21544 }
    ] },
    { time: "18:00", name: "Турнир Среды", buyin: 24100, league: 2, players: [
      { nick: "абыРвалГ", place: 2, reward: 8250 },
      { nick: "мистерFox", place: 6, reward: 2950 },
      { nick: "Ksuha🦎", place: 8, reward: 1900 },
      { nick: "zagrebnagreb", place: 9, reward: 1350 },
      { nick: "Winifly", place: 10, reward: 1150 }
    ] },
    { time: "19:00", name: "💸Big evening💰", buyin: 68200, league: 1, players: [
      { nick: "Waaar", place: 1, reward: 70000 },
      { nick: "абыРвалГ", place: 5, reward: 18000 },
      { nick: "\"ЗараЗа\"", place: 11, reward: 0 },
      { nick: "AliySvin", place: 12, reward: 0 },
      { nick: "Rifa", place: 19, reward: 0 }
    ] },
    { time: "20:00", name: "Hyper Turbo 300", buyin: 12000, league: 2, players: [
      { nick: "Откотика_Я", place: 5, reward: 3380 },
      { nick: "Рыбнадзор", place: 12, reward: 474 },
      { nick: "Sarmat1305", place: 20, reward: 410 }
    ] }
  ],
  "23.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 120k", buyin: 20000, league: 1, players: [
      { nick: "AlenaSt", place: 8, reward: 4921 },
      { nick: "outsider", place: 13, reward: 3313 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 12800, league: 1, players: [
      { nick: "VOSOvec", place: 1, reward: 15000 },
      { nick: "king00001", place: 4, reward: 0 },
      { nick: "ДжекПотный", place: 7, reward: 0 },
      { nick: "FrankL", place: 9, reward: 0 },
      { nick: "Палач", place: 12, reward: 0 }
    ] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 2100, league: 2, players: [
      { nick: "Shkarubo", place: 2, reward: 1500 },
      { nick: "FridaKahlo", place: 3, reward: 1000 },
      { nick: "ДжекПотный", place: 6, reward: 0 },
      { nick: "Ферапонт", place: 7, reward: 0 },
      { nick: "COBRA", place: 10, reward: 0 }
    ] },
    { time: "14:00", name: "Micro 200 50K GTD", buyin: 10000, league: 2, players: [
      { nick: "Jindaniels", place: 2, reward: 11100 }
    ] },
    { time: "18:00", name: "Турнир Четверга", buyin: 70000, league: 1, players: [
      { nick: "Kosik", place: 3, reward: 9300 },
      { nick: "WiNifly", place: 7, reward: 6150 },
      { nick: "ПокерМанки", place: 8, reward: 2900 },
      { nick: "Waaar", place: 11, reward: 1700 },
      { nick: "ПаПа_Мо}|{еТ", place: 15, reward: 1700 }
    ] },
    { time: "20:00", name: "Tournament PLO4", buyin: 11100, league: 2, players: [
      { nick: "RCD_Miron", place: 1, reward: 11000 },
      { nick: "ПокерМанки", place: 4, reward: 0 },
      { nick: "Sarmat1305", place: 5, reward: 0 },
      { nick: "абыРвалГ", place: 7, reward: 0 },
      { nick: "Superuser", place: 9, reward: 0 }
    ] },
    { time: "21:00", name: "MOK 🏰 MKO 7MAX", buyin: 15900, league: 2, players: [
      { nick: "AGE983", place: 2, reward: 2770 },
      { nick: "WiNifly", place: 3, reward: 1670 },
      { nick: "Ksuha🐍", place: 4, reward: 1320 },
      { nick: "DemonDen", place: 5, reward: 1210 },
      { nick: "Tanechka", place: 7, reward: 0 }
    ] }
  ],
  "24.04.2026": [
    { time: "00:00", name: "S.Bounty 2/3 120k", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 6, reward: 6567 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 10000, league: 2, players: [
      { nick: "Sarmat1305", place: 2, reward: 2463 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 8800, league: 1, players: [
      { nick: "FrankL", place: 1, reward: 15200 }
    ] },
    { time: "14:00", name: "Bounty 200 50K GTD", buyin: 10000, league: 2, players: [
      { nick: "AlenaSt", place: 3, reward: 2116 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "Em13!!", place: 1, reward: 23432 }
    ] },
    { time: "18:00", name: "Пятница Прогрессив", buyin: 60000, league: 1, players: [
      { nick: "Rom4ik", place: 4, reward: 13016.41 },
      { nick: "MOJO", place: 5, reward: 5816.25 },
      { nick: "Tokio90", place: 6, reward: 4149.37 },
      { nick: "WiNifly", place: 7, reward: 6265.31 },
      { nick: "Adam1993", place: 8, reward: 3315 }
    ] },
    { time: "20:00", name: "Tournament PLO4", buyin: 8400, league: 2, players: [
      { nick: "kriak", place: 1, reward: 6220 },
      { nick: "Sarmat1305", place: 3, reward: 2480 }
    ] },
    { time: "21:00", name: "MOK 7MAX", buyin: 14700, league: 2, players: [
      { nick: "WiNifly", place: 1, reward: 11610 },
      { nick: "Shkarubo", place: 2, reward: 7210 },
      { nick: "Yurak700", place: 5, reward: 1270 }
    ] },
    { time: "22:00", name: "Magic 500 120K", buyin: 10000, league: 1, players: [
      { nick: "МВД", place: 22, reward: 13040 },
      { nick: "Olegan393", place: 6, reward: 4467 },
      { nick: "outsider", place: 25, reward: 593 }
    ] }
  ],
  "25.04.2026": [
    { time: "08:00", name: "Bali Yana 20k", buyin: 10000, league: 1, players: [
      { nick: "nikola233", place: 3, reward: 4359 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 12800, league: 1, players: [
      { nick: "king00001", place: 2, reward: 9300 },
      { nick: "Waaar", place: 3, reward: 6160 }
    ] },
    { time: "13:00", name: "DV Bounty 100k", buyin: 10000, league: 1, players: [
      { nick: "Olegan393", place: 4, reward: 6698 },
      { nick: "Em13!!", place: 27, reward: 294 }
    ] },
    { time: "14:00", name: "Tournament Rebuy", buyin: 5500, league: 2, players: [
      { nick: "⚡72⚡", place: 2, reward: 2750 },
      { nick: "AlenaSt", place: 3, reward: 1830 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "Jindaniels", place: 2, reward: 10523 },
      { nick: "Em13!!", place: 0, reward: 585 }
    ] },
    { time: "18:00", name: "LUCKY 777 GTD", buyin: 20000, league: 1, players: [
      { nick: "Em13!!", place: 5, reward: 44355 },
      { nick: "AlenaSt", place: 25, reward: 1948 }
    ] },
    { time: "21:00", name: "MOK 7MAX", buyin: 10800, league: 2, players: [
      { nick: "⚡72⚡", place: 3, reward: 1355 },
      { nick: "Tanechka", place: 4, reward: 1080 }
    ] }
  ],
  "26.04.2026": [
    { time: "06:00", name: "Tai 7 1/2 KO 15k", buyin: 10000, league: 1, players: [
      { nick: "Evgen1722", place: 2, reward: 5915, points: 110 },
      { nick: "AlenaSt", place: 3, reward: 1365, points: 90 }
    ] },
    { time: "09:00", name: "KG PLO6 / 2$", buyin: 10000, league: 1, players: [
      { nick: "МВД", place: 1, reward: 6321, points: 135 }
    ] },
    { time: "12:00", name: "DV Rebuy", buyin: 11200, league: 1, players: [
      { nick: "PONOCHKA", place: 2, reward: 9000 },
      { nick: "PlayerHyeEr", place: 7, reward: 0 },
      { nick: "COBRA", place: 8, reward: 0 },
      { nick: "Палач", place: 9, reward: 0 },
      { nick: "мистерFox", place: 12, reward: 0 }
    ] },
    { time: "15:00", name: "New - Hot PKO 2/3", buyin: 10000, league: 1, players: [
      { nick: "хер вам))))", place: 2, reward: 11852, points: 110 }
    ] },
    { time: "16:00", name: "HOLDEM 6+ GTD 30K", buyin: 10000, league: 1, players: [
      { nick: "AndrushaMorf", place: 4, reward: 4156, points: 70 }
    ] },
    { time: "18:00", name: "Воскресный турнир 🏆", buyin: 186000, league: 1, players: [
      { nick: "Em13", place: 2, reward: 51181.25 },
      { nick: "VOSOvec", place: 3, reward: 26006.25 },
      { nick: "Алеша™", place: 6, reward: 13540.62 },
      { nick: "WiNifly", place: 7, reward: 9825 },
      { nick: "Waaar", place: 9, reward: 8175 }
    ] },
    { time: "21:00", name: "MOK 7MAX", buyin: 18900, league: 2, players: [
      { nick: "AlenaSt", place: 2, reward: 4250 },
      { nick: "Shkarubo", place: 4, reward: 4675 },
      { nick: "Алеша™", place: 5, reward: 1270 },
      { nick: "Ksuha🦎", place: 7, reward: 0 },
      { nick: "\"Зараза\"", place: 8, reward: 0 }
    ] }
  ]
};
