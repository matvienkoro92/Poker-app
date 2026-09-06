"use strict";

// Kept in sync with the rating character catalog by sng-notification-banner.test.js.
const artByNick = {
  "gucci💱": { src: "./assets/club-news-personal/gucci-finalist-cutout.webp?v=1" },
  "porquinho": { src: "./assets/sng-finalist-porquinho.webp" },
  "поркиньо": { src: "./assets/sng-finalist-porquinho.webp" },
  "поркиньё": { src: "./assets/sng-finalist-porquinho.webp" },
  "штукатур": { src: "./assets/sng-finalist-shtukatur.webp" },
  "shtukatur": { src: "./assets/sng-finalist-shtukatur.webp" },
  "hakas": { src: "./assets/sng-finalist-hakas.webp" },
  "хакас": { src: "./assets/sng-finalist-hakas.webp" },
  "aza": { src: "./assets/sng-finalist-aza.webp" },
  "aza32": { src: "./assets/sng-finalist-aza.webp" },
  "аза": { src: "./assets/sng-finalist-aza.webp" },
  "аза32": { src: "./assets/sng-finalist-aza.webp" },
  "waaar": { src: "./assets/summer-rating-player-waaar.webp", place: 1, league: 1 },
  "покерманки": { src: "./assets/summer-rating-player-pokermanki-v2.webp?v=1", place: 2, league: 1 },
  "coo1er91": { src: "./assets/summer-rating-player-cooler.webp", place: 3, league: 1 },
  "em13!!": { src: "./assets/summer-rating-player-emil.webp", place: 4, league: 1 },
  "winifly": { src: "./assets/summer-rating-player-winifly.webp", place: 5, league: 1 },
  "missclick": { src: "./assets/summer-rating-player-missclick.webp?v=2", place: 6, league: 1 },
  "рыбнадзор": { src: "./assets/summer-rating-player-rybnadzor.webp", place: 7, league: 1 },
  "nikola233": { src: "./assets/summer-rating-player-nikola233.webp", place: 7, league: 1 },
  "milkyway77": { src: "./assets/summer-rating-player-milkyway.webp", place: 8, league: 1 },
  "пряник": { src: "./assets/summer-rating-player-pryanik.webp", place: 9, league: 1 },
  "pryanik2la": { src: "./assets/summer-rating-player-pryanik.webp", place: 9, league: 1 },
  "prushnik": { src: "./assets/summer-rating-player-prushnik.webp", place: 9, league: 1 },
  "evgen1722": { src: "./assets/summer-rating-player-evgen1722.webp", place: 10, league: 1 },
  "хер вам)))))": { src: "./assets/summer-rating-player-khervam.webp", place: 10, league: 1 },
  "frankl": { src: "./assets/summer-rating-player-morf.webp", place: 10, league: 1 },
  "kriak": { src: "./assets/summer-rating-player-kriak.webp", place: 10, league: 1 },
  "andrushamorf": { src: "./assets/summer-rating-player-morf.webp", place: 10, league: 1 },
  "4ezzi": { src: "./assets/summer-rating-player-morf.webp", place: 10, league: 1 },
  "morf": { src: "./assets/summer-rating-player-morf.webp", place: 10, league: 1 },
  "морф": { src: "./assets/summer-rating-player-morf.webp", place: 10, league: 1 },
  "alenast": { src: "./assets/summer-rating-league2-player-alena.webp", place: 1, league: 2 },
  "shkarubo": { src: "./assets/summer-rating-league2-player-shkarubo.webp", place: 2, league: 2 },
  "sarmat1305": { src: "./assets/summer-rating-league2-player-sarmat.webp", place: 3, league: 2 },
  "палач": { src: "./assets/summer-rating-league2-player-palach.webp", place: 5, league: 2 },
  "nakurikota": { src: "./assets/summer-rating-league2-player-nakurikota.webp", place: 6, league: 2 },
  "накурикота": { src: "./assets/summer-rating-league2-player-nakurikota.webp", place: 6, league: 2 },
  "wildboar": { src: "./assets/summer-rating-league2-player-wildboar.webp", place: 7, league: 2 },
  "бабник": { src: "./assets/summer-rating-league2-player-babnik.webp", place: 9, league: 2 },
  "виктор": { src: "./assets/summer-rating-league2-player-viktor.webp", place: 5, league: 2 },
  "мистерfox": { src: "./assets/summer-rating-league2-player-mr-fox.webp", place: 7, league: 2 },
  "babyshark": { src: "./assets/summer-rating-league2-player-babyshark.webp", place: 8, league: 2 },
  "аспирин": { src: "./assets/summer-rating-league2-player-aspirin.webp", place: 9, league: 2 },
  "ksuha": { src: "./assets/summer-rating-league2-player-ksyukha.webp", place: 10, league: 2 },
  "ksuha🐍": { src: "./assets/summer-rating-league2-player-ksyukha.webp", place: 10, league: 2 },
  "ksuha🐊": { src: "./assets/summer-rating-league2-player-ksyukha.webp", place: 10, league: 2 },
  "ksuha🦖": { src: "./assets/summer-rating-league2-player-ksyukha.webp", place: 10, league: 2 },
  "ksuha🐉": { src: "./assets/summer-rating-league2-player-ksyukha.webp", place: 10, league: 2 },
  "zagrebnagreb": { src: "./assets/summer-rating-league2-player-zagrebnagreb.webp", place: 10, league: 2 },
  "zagrebrnagreb": { src: "./assets/summer-rating-league2-player-zagrebnagreb.webp", place: 10, league: 2 },
};

function sngPlayerArt(entry) {
  if (entry.accountId === "ID604155") return "./assets/club-news-personal/gucci-finalist-cutout.webp?v=1";
  const key = String(entry.pokerPlusNickname || entry.displayName || "").trim().toLowerCase();
  return artByNick[key]?.src || "";
}

module.exports = { sngPlayerArt, artByNick };
