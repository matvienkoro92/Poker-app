import rating from '../../lib/game-rating-score.js';
export function mountGameRatingExplanation(anchor){
 const details=document.createElement('details');details.className='game-rating-explanation';
 const summary=document.createElement('summary'),formula=document.createElement('p'),note=document.createElement('p');
 summary.textContent='Как считается рейтинг';formula.textContent=rating.formula;note.textContent=rating.explanation;
 details.append(summary,formula,note);anchor.after(details);return details;
}
