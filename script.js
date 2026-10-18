window.addEventListener('DOMContentLoaded', () => {
    // Initialisierung des 3D-Buchs mit StPageFlip
    const pageFlip = new St.PageFlip(document.getElementById('buch'), {
        width: 500, // Breite einer einzelnen Seite
        height: 650, // Höhe einer einzelnen Seite
        size: "stretch", // Passt sich flexibel dem iPad-Bildschirm an
        minWidth: 300,
        maxWidth: 700,
        minHeight: 400,
        maxHeight: 900,
        maxShadowOpacity: 0.5, // Echter 3D-Schattenwurf beim Blättern
        showCover: true, // Startet mit dem geschlossenen Buch/Cover
        mobileScrollSupport: false
    });

    // Lädt alle Seiten aus dem HTML
    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    // Erzeugt das Blätter-Geräusch beim Umblättern
    pageFlip.on('flip', (e) => {
        spielBlätterTon();
    });
});

// Sound-Effekt über die Web Audio API
function spielBlätterTon() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(250, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.12);
        
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
        // Stumm weitermachen, falls Audio nicht unterstützt wird
    }
}
