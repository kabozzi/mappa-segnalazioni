// ==========================================================
// 🚨🚨🚨 1. AGGIORNA QUESTO URL con quello che hai copiato da Google Apps Script 🚨🚨🚨
// ==========================================================
const SCRIPT_URL = 'INCOLLA_QUI_L_URL_DELLA_TUA_WEB_APP_APPS_SCRIPT'; 
// Esempio: 'https://script.google.com/macros/s/AKfycbz_XXXXXXXXXXXX/exec' 
// ==========================================================

document.getElementById('the-form').addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault(); // Impedisce il ricaricamento della pagina
    
    const form = event.target;
    const responseMessage = document.getElementById('response-message');
    
    // Mostra messaggio di caricamento
    responseMessage.textContent = "Invio in corso...";
    responseMessage.style.display = 'block';

    try {
        // Raccogli i dati dal modulo
        const data = new FormData(form);
        const payload = {
            latitudine: data.get('latitudine'),
            longitudine: data.get('longitudine'),
            orario: data.get('orario'),
            targa: data.get('targa'),
            note: data.get('note')
        };
        
        // Invio dei dati con il metodo POST all'URL di Apps Script
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: new URLSearchParams(payload) // Formato richiesto da Apps Script
        });

        // Controlla la risposta
        if (response.ok) {
            responseMessage.textContent = '✅ Segnalazione inviata con successo!';
            form.reset(); // Resetta il modulo
            // Ricarica i marker sulla mappa per mostrare la nuova segnalazione (funzione da implementare)
            loadMarkers(); 
        } else {
            responseMessage.textContent = '❌ Errore durante l\'invio.';
        }
    } catch (error) {
        console.error('Errore durante la fetch:', error);
        responseMessage.textContent = '❌ Errore di connessione.';
    }
}

// ==========================================================
// 2. FUNZIONI PER LA MAPPA DI GOOGLE (Richiedono la Chiave API)
// ==========================================================
let map;
let geocoder;
let markers = []; // Array per tenere traccia dei marker attivi

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.4384, lng: 10.9916 }, // Verona (o altra città centrale in Italia)
        zoom: 12
    });

    // Funzione per tradurre l'indirizzo in coordinate e popolare i campi nascosti
    setupAddressInput(); 

    // Carica le segnalazioni esistenti dal Google Sheet (funzione da implementare)
    // loadMarkers(); 
}

function setupAddressInput() {
    const input = document.getElementById('luogo');
    const latitudeInput = document.getElementById('latitudine');
    const longitudeInput = document.getElementById('longitudine');
    
    // Aggiungiamo un listener per cercare l'indirizzo quando l'utente smette di digitare
    input.addEventListener('change', () => {
        const address = input.value;
        if (address) {
            geocoder.geocode({ 'address': address }, (results, status) => {
                if (status === 'OK') {
                    const location = results[0].geometry.location;
                    
                    // Salva Latitudine e Longitudine nei campi nascosti
                    latitudeInput.value = location.lat();
                    longitudeInput.value = location.lng();

                    // Centra la mappa sulla posizione trovata
                    map.setCenter(location);
                    
                    // (Opzionale) Aggiungi un marker temporaneo per la posizione scelta
                    new google.maps.Marker({
                        map: map,
                        position: location,
                        title: address
                    });

                } else {
                    alert('Geocodifica fallita: ' + status);
                    latitudeInput.value = '';
                    longitudeInput.value = '';
                }
            });
        }
    });
}

/**
 * Funzione placeholder per recuperare i dati dal Google Sheet e posizionare i marker.
 * Richiede una seconda funzione doGet() in Apps Script per l'estrazione dei dati.
 */
function loadMarkers() {
    // Questa parte è più complessa e la affronteremo dopo l'invio dei dati!
    console.log("Funzione di caricamento marker da Apps Script ancora non implementata.");
}