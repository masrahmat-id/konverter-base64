document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const base64Output = document.getElementById('base64Output');
    const convertButton = document.getElementById('convertButton');
    const copyButton = document.getElementById('copyButton');
    const message = document.getElementById('message');

    // ** GANTI VARIABEL INI DENGAN URL REPOSITORY ANDA YANG SEBENARNYA **
    // Pastikan path ke redirect.html sudah benar.
    const REDIRECT_PREFIX = 'https://masrahmat-id.github.io/konverter-base64/redirect.html?url=';
    // ***************************************************************

    // --- Fungsi Konversi ---
    convertButton.addEventListener('click', () => {
        const url = urlInput.value.trim();
        base64Output.value = ''; 
        message.textContent = ''; 
        base64Output.placeholder = 'Hasil Base64 akan muncul di sini...';

        if (!url) {
            message.textContent = '⚠️ Harap masukkan URL atau teks.';
            message.className = 'message error';
            return;
        }

        try {
            // 1. Lakukan Konversi ke Base64 (sama seperti sebelumnya)
            const base64String = btoa(unescape(encodeURIComponent(url)));
            
            // 2. GABUNGKAN PREFIX DENGAN HASIL BASE64
            const finalRedirectLink = REDIRECT_PREFIX + base64String;

            // 3. Tampilkan Link Lengkap di Kolom Output
            base64Output.value = finalRedirectLink;
            base64Output.placeholder = 'Link redirect Anda siap!';
            message.textContent = '✅ Konversi berhasil! Salin tautan redirect di bawah.';
            message.className = 'message success';
        } catch (error) {
            message.textContent = '❌ Gagal melakukan konversi. Mungkin ada karakter yang tidak didukung.';
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
