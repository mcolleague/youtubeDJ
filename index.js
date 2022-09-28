const pl = document.querySelector('video');
let cuePoint = 0;

pl.preservesPitch = false;
addComponent('style', document.querySelector('head'), getStyles());
addComponent('div', document.querySelector('#primary #player'), getHTML());

function cue(){
    pl.currentTime = cuePoint;
    pl.play();
}

function setCue(){
    cuePoint = pl.currentTime;
    document.querySelector('.ytdj-dash .cue-point').innerHTML = cuePoint.toFixed(2);
}

function onPitchSliderInput(val){
    const d = 1 + ((val - 50) / 100);
    pl.playbackRate = d;
}

function resetPitch(){
    pl.playbackRate = 1;
    document.querySelector('.ytdj-dash__pitchSlider input').value = 50;
}

function addComponent(tag, target, html){
    const el = document.createElement(tag || 'div');
    el.innerHTML = html;
    target.append(el);
    console.log('component added', {tag, target, html, el})
}

function getHTML () { return `
    <div class="ytdj-dash">
        <div class="ytdj-dash__header"><span>youtube dj</span></div>
        <div class="ytdj-dash__main">
            <div class="ytdj-dash__row">
                <div class="ytdj-dash__pitchSlider">
                    <label>Pitch</label> 
                    <input type="range" value="50" oninput="onPitchSliderInput(this.value)"> 
                    <button onclick="resetPitch()">Reset</button>
                </div>
            </div>
            <div class="ytdj-dash__row">
                <div class="ytdj-dash__cue">
                    <label>Cue</label> 
                    <button onclick="setCue()">Set cue</button> 
                    <button onclick="cue()">Cue</button> 
                    <span class="cue-point"></span>
                </div>
            </div>
        </div>
        <div class="ytdj-dash__footer"></div>
    </div>`;
}

function getStyles () { return `
    .ytdj-dash {
        position:absolute;
        top:10px;
        left:10px;
        width:200px;
        height:200px;
        background-color:#fff;
        border-radius:2px;
        font-size:15px;
        font-family:monospace
    }
    .ytdj-dash__header{
        padding:10px 20px;
        background-color:#233a4d;
        color:#fff;
        display:flex;
        align-items:center
    }
    .ytdj-dash__footer, .ytdj-dash__main{
        padding:10px 20px
    }
    .ytdj-dash__row{
        margin-bottom:15px
    }
    .ytdj-dash .cue-point{
        font-size:13px;
        color:#367faa
    }`;
}