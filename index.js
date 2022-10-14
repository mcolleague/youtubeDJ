const pl = document.querySelector('video');
const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(pl);
const biquadFilter = audioCtx.createBiquadFilter();
let cuePoint = 0;

// Connect audio nodes
source.connect(biquadFilter);
biquadFilter.connect(audioCtx.destination);

// Set filter type and initial value
biquadFilter.type = 'highpass';
biquadFilter.frequency.value = 0;

// Disable pitch preservation for natural effect
pl.preservesPitch = false;

// Create GUI
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

function onFilterSliderInput (val) {
    biquadFilter.frequency.value = 5000 * (val/100);
}

function resetPitch(){
    const $input = document.getElementById('pitch-control');
    pl.playbackRate = 1;
    $input.value = $input.getAttribute('value');
}

function resetHighPassFilter(){
    const $input = document.getElementById('high-pass-filter-control');
    biquadFilter.frequency.value = 0;
    $input.value = $input.getAttribute('value');    
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
                <div class="ytdj-dash__sliderControl">
                    <label>Pitch</label> 
                    <input 
                        id="pitch-control"
                        type="range" 
                        value="50" 
                        oninput="onPitchSliderInput(this.value)"> 
                    <button onclick="resetPitch()">Reset</button>
                </div>
            </div>
            <div class="ytdj-dash__row">
                <div class="ytdj-dash__sliderControl">
                    <label>High-pass filter</label> 
                    <input 
                        id="high-pass-filter-control"
                        type="range" 
                        value="0" 
                        oninput="onFilterSliderInput(this.value)"> 
                    <button onclick="resetHighPassFilter()">Reset</button>
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