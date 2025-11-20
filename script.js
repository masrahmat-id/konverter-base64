document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const base64Output = document.getElementById('base64Output');
    const convertButton = document.getElementById('convertButton');
    const copyButton = document.getElementById('copyButton');
    const message = document.getElementById('message');

    // 👇 PENTING: GANTI VARIABEL INI dengan URL Repositori dan Path yang Benar
    const REDIRECT_PREFIX = 'https://masrahmat-id.github.io/konverter-base64/redirect.html?url=';
    // *************************************************************************

    // --- Fungsi Konversi ---
    convertButton.addEventListener('click', () => {
        const url = urlInput.value.trim();
        base64Output.value = ''; 
        message.textContent = ''; 

        if (!url) {
            message.textContent = '⚠️ Harap masukkan URL atau teks.';
            message.className = 'message error';
            return;
        }

        try {
            // 1. Konversi Teks/URL menjadi Base64
            const base64String = btoa(unescape(encodeURIComponent(url)));
            
            // 2. GABUNGKAN (Concatenate) Base64 dengan Prefix URL Redirect
            // Contoh: https://.../redirect.html?url= + aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbQ==
            const finalRedirectLink = REDIRECT_PREFIX + base64String;

            // 3. Tampilkan Link Lengkap di Kolom Output
            base64Output.value = finalRedirectLink;
            message.textContent = '✅ Konversi berhasil! Tautan redirect siap digunakan.';
            message.className = 'message success';
        } catch (error) {
            message.textContent = '❌ Gagal melakukan konversi. Pastikan input valid.';
            message.className = 'message error';
            console.error('Base64 Conversion Error:', error);
        }
    });

    // --- Fungsi Salin ---
    copyButton.addEventListener('click', () => {
        if (base64Output.value) {
            base64Output.select();
            document.execCommand('copy');
            message.textContent = '📋 Tautan redirect berhasil disalin!';
            message.className = 'message success';
        } else {
            message.textContent = '⚠️ Tidak ada hasil untuk disalin.';
            message.className = 'message warning';
        }
    });
});
