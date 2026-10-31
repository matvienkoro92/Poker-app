'use strict';
function rewards(stake=0){const participation=stake>0?(stake>=500?200:100):30;return {participation,win:participation*2};}
module.exports={rewards};
