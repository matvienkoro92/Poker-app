import rating from '../../lib/game-rating-score.js';
export function mountGameRatingExplanation(anchor){
 const details=document.createElement('details');details.className='game-rating-explanation';
 const summary=document.createElement('summary'),formula=document.createElement('p'),note=document.createElement('p');
 summary.textContent='Как считается рейтинг';formula.textContent=rating.formula;note.textContent=rating.explanation;
 const paidFormula=document.createElement('p'),paidNote=document.createElement('p');paidFormula.textContent='На фишки: '+rating.paidFormula;paidFormula.style.fontWeight='700';paidNote.textContent=rating.paidExplanation;paidNote.style.whiteSpace='pre-line';details.append(summary,formula,note,paidFormula,paidNote);anchor.after(details);return details;
}
