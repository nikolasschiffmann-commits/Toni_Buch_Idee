// Aktuelle Seite, bei 0 fangen wir an (Cover)
let aktuelleSeite = 0;
const seiten = document.querySelectorAll('.seite');

// Funktion zum Umblättern
function blättern(richtung) {
    seiten[aktuelleSeite].style.display = 'none';
    
    aktuelleSeite += richtung;
    
    // Begrenzung, damit wir nicht über das Ende hinausblättern
    if (aktuelleSeite >= seiten.length) {
        aktuelleSeite = 0; // Wieder von vorne anfangen
    } else if (aktuelleSeite < 0) {
        aktuelleSeite = seiten.length - 1;
    }
    
    seiten[aktuelleSeite].style.display = 'flex';
    
    // Kleine Sound-Effekt-Simulation (Web Audio API für ein dezentes "Blätter-Geräusch")
    spielBlätterTon();
}

// Nur die erste Seite beim Start anzeigen, den Rest verstecken
window.onload = () => {
    seiten.forEach((s, index) => {
        if (index !== 0) s.style.display = 'none';
    });

    // Klick ins Buch blättert automatisch weiter
    document.getElementById('buch').addEventListener('click', () => {
        blättern(1);
    });
};

// Erzeugt ein kurzes, sanftes "Wisch"-Geräusch über den Browser
function spielBlätterTon() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.15);
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
        // Falls der Browser keinen AudioContext erlaubt, läuft es einfach stumm weiter
    }
}
