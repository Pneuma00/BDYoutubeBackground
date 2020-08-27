let setVideoBackground = Id => {
    let iframe = document.createElement('div');
    iframe.id = 'player';
    document.getElementsByClassName('da-appMount')[0].append(iframe);

    let script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    let style = document.createElement('style');
    style.innerHTML = `
    .da-bg { background-color: rgba(25, 25, 25, 0.65); }
    #player { position: fixed; z-index: -100; width: 100%; left: 50%; top: 48.2%; transform: translate(-50%, -50%); }
    .da-appMount, .da-container, .da-wrapper, .da-base, .da-layer, .da-layers, .da-sidebar, .da-app, .da-chat, .da-content, .da-embedFull, .da-scroller, .da-panels, .da-nowPlayingColumn, .da-privateChannels, .da-applicationStore, .da-contentRegion, .da-standardSidebarView, .da-members, .da-listContent, .da-systemPad, .content-region, .content-region-scroller, .da-form:before { background: transparent !important; border: 0; }
    .da-bodyInner, .da-grid { background: #2f3136 !important; }`
    document.body.appendChild(style);

    let player;

    onYouTubeIframeAPIReady = () => {
        player = new YT.Player('player', {
            height: '1080',
            width: '1920',
            videoId: Id,
            playerVars: {
                autoplay: 1,
                loop: 1,
                // wmode: 'transparent',
                modestbranding: 1,
                vq: 'hd1080',
                mute: 1,
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    onPlayerReady = event => {
        event.target.playVideo();
    }

    let rewindTO;

    onPlayerStateChange = event => {
        const YTP = event.target;

        if (event.data === 1) {
            const remains = YTP.getDuration() - YTP.getCurrentTime();
            if (rewindTO) clearTimeout(rewindTO);

            rewindTO = setTimeout(() => {
                YTP.seekTo(0);
            }, (remains - 0.2) * 1000);
        }
    }
}
