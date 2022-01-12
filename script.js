/**
* 1. Render Songs
* 2. Scroll Top
* 3. Play Pause Seek
* 4. CD rotate
* 5. Next / Prev
* 6. Random
* 7. Next / Repeat when ended
* 8. Active Song
* 9. Scroll active song into view
* 10. Play song when clik    
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const singer = $('header p');
const song_count = $('.song_count');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev')
const volBtn = $('.btn-volume');
const progress = $('.progress');
const repeatBtn = $('.btn-repeat');
const radomBtn = $('.btn-random')
const time = $('.timeline')
const playlist = $('.playlist')
const nav = $('.navigation')
const volume = $('.volume')
const mode = $('#toggle_checkbox')
const searchInput = $('.search')
const microphone = $('.microphone');
const menu =$('.menu');


var isRadom = false;
var isRepeat = false;
var isMute = false;

const songsApi = 'http://localhost:3000/songs';

const app = {
    currentIndex: 0,
    currentVol: 0,
    songs: [
        {
            id: 1,
            name: "Hạ Còn Vương Nắng",
            singer: "DatKaa",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1014/HaConVuongNang-DatKaa-7004769.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/04/15/5/b/e/5/1618468925875_500.jpg",
            istym: false,
            listen: 11
        },
        {
            id: 2,
            name: "Đường Tôi Chở Em Về",
            singer: "Danny Avila",
            path: "https://c1-ex-swe.nixcdn.com/Unv_Audio164/DuongTaChoEmVe-buitruonglinh-6318765.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2020/07/02/5/d/c/9/1593687560557_500.jpg",
            istym: false,
            listen: 2
        },
        {
            id: 3,
            name: "What Are Words",
            singer: "Chris Medina",
            path: "https://c1-ex-swe.nixcdn.com/Unv_Audio12/WhatAreWords-ChrisMedina-2629818.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2019/05/04/6/6/a/7/1556905949684_500.jpg",
            istym: true,
            listen: 33
        },
        {
            id: 4,
            name: "Why Not Me",
            singer: "Enrique Iglesias",
            path: "https://c1-ex-swe.nixcdn.com/Unv_Audio86/WhyNotMe-EnriqueIglesias-3479372.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2018/09/20/2/c/a/3/1537413925557_500.jpg",
            istym: false,
            listen: 4
        },
        {
            id: 5,
            name: "Let Her Go",
            singer: "Passenger",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui882/LetHerGo-Passenger-3719556.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2018/02/08/b/b/c/8/1518073035542_500.jpg",
            istym: false,
            listen: 25
        },
        {
            id: 6,
            name: "Muộn Rồi Mà Sao Còn",
            singer: "Sơn Tùng MTP",
            path: "https://c1-ex-swe.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2019/07/03/7/5/b/e/1562137543919_500.jpg",
            istym: false,
            listen: 15
        },
        {
            id: 7,
            name: "Nevada",
            singer: "Vicetone, Cozi Zuehlsdorff",
            path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2018/06/19/7/b/9/3/1529382807600_500.jpg",
            istym: false,
            listen: 6
        },
        {
            id: 8,
            name: "End Of The Night",
            singer: "Danny Avila",
            path: "https://c1-ex-swe.nixcdn.com/Sony_Audio51/EndOfTheNight-DannyAvila-5755247.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2018/11/20/d/4/2/9/1542656203963_500.jpg",
            istym: false,
            listen: 7
        },

    ],
    // http://api.mp3.zing.vn/api/streaming/audio/ID/320

    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex]
            }
        })

    },
    render() {
        const _this = this;
        const html = this.songs.map((song, index) => {
            return `
                <div class="song ${index == this.currentIndex ? 'active' : ''}" data-index = ${index}>
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title m-0">${song.name}</h3>
                        <p class="author m-0">${song.singer}</p>
                    </div>
                    <div class="option ${song.istym ? 'istym' : ''}">
                        <i class="far fa-heart false"></i>
                        <i class="fas fa-heart true"></i>
                    </div>
                </div>`
        })

        $('.playlist').innerHTML = html.join('');


    },
    handleEvent() {
        const _this = this;
        
        // Search Focus
        searchInput.onfocus = ()=>{
            searchInput.removeAttribute('placeholder');
        
        }
        searchInput.onblur = ()=>{
            searchInput.placeholder = 'Search for song, artists etc...';
            
        }
        //Menu Icon Click
        menu.onclick=(e)=>{
            if(e.target.closest(".menu_icon")){
                if($('.box_out').style.right=='-100%'){
                    $('.box_out').style.right = '0';
                    menu.classList.add("active")
                }else{
                    $('.box_out').style.right = '-100%';
                    menu.classList.remove("active")
                }
            }
        }

        //Đĩa xoay
        const cdRotate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ],
            {
                duration: 10000,
                iterations: Infinity
            }
        )
        cdRotate.pause();

        //Play Event
        playBtn.onclick = () => {
            if ($('.playing')) {
                audio.pause();
                cdRotate.pause();
            } else {
                audio.play();
                cdRotate.play();
            }
            player.classList.toggle('playing');
            this.updateTime();
            progress.onchange = (e) => {
                const seektime = e.target.value * audio.duration / 100;
                audio.currentTime = seektime;
            }
        }

        //Next Event
        nextBtn.onclick = () => {
            this.nextSong();

            const live = Number($('.song.active').dataset.index);

            const listSong = $$('.song');
            const liveNext = listSong[this.currentIndex];
            liveNext.scrollIntoView({ behavior: 'smooth', block: "center" });
            liveNext.classList.add('active')

            if (isRadom) {

                listSong[live].classList.remove('active')

            } else {
                if (this.currentIndex == 0) {
                    listSong[listSong.length - 1].classList.remove('active')
                } else {
                    listSong[this.currentIndex - 1].classList.remove('active')
                }

            }

            if ($('.playing')) {
                audio.play();
            }
            else {
                audio.pause();
            }
        }

        //Prev Event
        prevBtn.onclick = () => {
            this.prevSong();

            const live = Number($('.song.active').dataset.index);

            const listSong = $$('.song');
            const livePrev = listSong[this.currentIndex];
            livePrev.scrollIntoView({ behavior: 'smooth', block: "center" });
            livePrev.classList.add('active')

            if (isRadom) {
                listSong[live].classList.remove('active')
            } else {
                if (this.currentIndex == listSong.length - 1) {
                    listSong[0].classList.remove('active')
                } else {
                    listSong[this.currentIndex + 1].classList.remove('active')
                };
            }

            if ($('.playing')) {
                audio.play();
            }
            else {
                audio.pause();
            }
        }

        //Repeat Event
        repeatBtn.onclick = () => {
            var currentClone = this.currentIndex;
            if (isRepeat == true) {
                repeatBtn.style.color = '#666';
                isRepeat = false
            } else {
                repeatBtn.style.color = 'var(--primary-color)';
                isRepeat = true
                this.currentIndex = currentClone;
            }

        }

        //Random Event
        radomBtn.onclick = () => {
            if (isRadom == true) {
                radomBtn.style.color = '#666';
                isRadom = false
            } else {
                radomBtn.style.color = 'var(--primary-color)';
                isRadom = true
            }
        }

        // Xử Lý sự kiện với Volume
        volume.onchange = (e) => {
            audio.volume = e.target.value / 100;
            this.currentVol = e.target.value;
            if (this.currentVol == 0) {
                volBtn.classList.add('isMute')
            } else {
                volBtn.classList.remove('isMute')
            }
        }
        volBtn.onclick = () => {
            if (isMute == true) {
                audio.volume = this.currentVol / 100;
                volume.value = this.currentVol;
                isMute = false
            } else {
                audio.volume = 0;
                volume.value = 0;
                isMute = true;
            }
            volBtn.classList.toggle('isMute');
        }

        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");

            // Xử lý sự kiện khi click vào song
            if (songNode && !e.target.closest(".option")) {

                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    $('.song.active').classList.remove('active');
                    songNode.classList.add('active');
                    _this.loadCurrentSong();
                    if (!$('.playing')) {
                        playBtn.click();
                    } else {
                        audio.play();
                    }
                    cdRotate.play();
                }
            }

            // Xử lý sự kiện khi click vào option
            if (e.target.closest(".option")) {

                e.target.closest(".option").classList.toggle('istym');
            }
        };

        // Xử lý sự kiện khi click vào top
        $('.topchart_body').onclick = (e) => {
            let oldIndex = this.currentIndex
            if (e.target.closest('.top')) {
                idCheck = Number(e.target.closest('.top').dataset.index)
                this.songs.forEach((song, index) => {
                    if (song.id == idCheck) {
                        this.currentIndex = index;
                    }
                })
                $$('.song')[oldIndex].classList.remove('active')
                $$('.song')[this.currentIndex].classList.add('active')
                $$('.song')[this.currentIndex].scrollIntoView({ behavior: 'smooth', block: "center" });
                this.loadCurrentSong();
                if (!$('.playing')) {
                    playBtn.click();
                } else {
                    audio.play();
                }
            }
        }

        //Xử lý sự kiện nhả nút trên bàn phím
        document.onkeyup = (e) => {
            switch (e.which) {
                case 32: playBtn.click(); //Space
                    break;
                case 82: microphone.click();
                    break;
            }
        }

        //Xử lý khi click vào Mode
        mode.onclick = (e) => {
            if (e.target.checked) {
                player.classList.add('nightMode')
            } else {
                player.classList.remove('nightMode')
            }

        }
        $('.mode2').onclick = (e) => {
            if (e.target.checked) {
                player.classList.add('nightMode') 
            } else {
                player.classList.remove('nightMode')

            }

        }

    },

    updateTime() {
        const _this = this;
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const process = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = process;
            }
            if (audio.currentTime == audio.duration) {
                if (isRepeat == true) {
                    audio.play();
                } else {
                    nextBtn.click();
                    audio.play();
                }
            }
            setInterval(function () {
                $('.time-count').innerHTML = _this.toHHMMSS(audio.currentTime);
            }, 1000);
        }
    }
    ,
    toHHMMSS(secs) {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60
        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    },
    loadCurrentSong() {
        heading.innerHTML = this.currentSong.name;
        singer.innerHTML = this.currentSong.singer;
        song_count.innerHTML = `${this.songs.length} Songs`;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
        setTimeout(() => {
            $('.time-count').innerHTML = this.toHHMMSS(audio.currentTime);
            $('.time-duration').innerHTML = this.toHHMMSS(audio.duration);
        }, 1000);
        this.currentVol = volume.value = audio.volume * 100;
    },
    loadTopSong() {
        let songClone = this.songs.slice();
        let listenTop = songClone.sort((a, b) => b.listen - a.listen).slice(0, 5);
        let html = listenTop.map((song, index) => {

            return `<div class="card_item top top${index + 1}" data-index=${song.id}>
                        <img class="card_img" src=${song.image}>
                        <div class="card_body">
                            <h6 class="card_title">${song.name}</h6>
                            <span class="card_text">${song.singer}</span>
                        </div>
                    </div>    
                    `
        })

        $('.topchart_body').innerHTML = html.join('')
    }
    ,
    nextSong() {
        if (isRadom == true) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * this.songs.length);
            } while (newIndex === this.currentIndex);

            this.currentIndex = newIndex;
            this.loadCurrentSong();
        } else {
            if (this.currentIndex == this.songs.length - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.loadCurrentSong();
        }
    },
    prevSong() {
        if (isRadom == true) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * this.songs.length);
            } while (newIndex === this.currentIndex);

            this.currentIndex = newIndex;
            this.loadCurrentSong();
        } else {
            if (this.currentIndex == 0) {
                this.currentIndex = this.songs.length - 1;
            } else {
                this.currentIndex--;
            }
            this.loadCurrentSong();
        }
    },
    siri() {

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        const synth = window.speechSynthesis;
        recognition.lang = 'vi-VI';
        recognition.continuous = false;

        const speak = (text) => {
            if (synth.speaking) {
                console.error('Busy. Speaking...');
                return;
            }

            const utter = new SpeechSynthesisUtterance(text);

            utter.onend = () => {
                console.log('SpeechSynthesisUtterance.onend');
            }
            utter.onerror = (err) => {
                console.error('SpeechSynthesisUtterance.onerror', err);
            }

            synth.speak(utter);
        };

        const handleVoice = (text) => {

            const handledText = text.toLowerCase();
            if (handledText.includes('tìm')) {
                const location = handledText.split('tìm')[1].trim();
                searchInput.value = location;
                return;
            }

            if (handledText.includes('top')) {
                const location = handledText.split('top')[1].trim();
                console.log(location);
                $$('.top').forEach((top, index) => {
                    if (index == location - 1) {
                        top.click();
                    }
                })
                return;
            }

            if (handledText.includes('thay đổi chế độ')) {
                mode.click()
                return;
            }

            if (handledText.includes('mấy giờ')) {
                let time = new Date();
                const textToSpeech = `${time.getHours()} hours ${time.getMinutes()} minutes`;
                console.log(textToSpeech);
                speak(textToSpeech);
                return;
            }

            speak('Try again');
        }

        microphone.addEventListener('click', (e) => {
            e.preventDefault();

            recognition.start();
            microphone.classList.add('recording');
        });

        recognition.onspeechend = () => {
            recognition.stop();
            microphone.classList.remove('recording');
        }

        recognition.onerror = (err) => {
            console.error(err);
            microphone.classList.remove('recording');
        }

        recognition.onresult = (e) => {
            console.log('onresult', e);
            const text = e.results[0][0].transcript;
            handleVoice(text);
        }

    },
    start() {
        this.defineProperties();
        this.render();
        this.loadCurrentSong();
        this.loadTopSong();
        this.handleEvent();
        this.siri();
    }

}
app.start();




