export function mountConnectionNotice(container){
 const note=document.createElement('p');note.className='connection-recovery';note.hidden=true;note.setAttribute('role','status');container.append(note);
 return {update(connection,player){note.hidden=!connection?.paused;if(connection?.paused)note.textContent=(connection.player===player?'Восстанавливаем вашу связь':'Соперник восстанавливает связь')+' · таймер приостановлен · резерв '+connection.remainingSeconds+' с';}};
}
