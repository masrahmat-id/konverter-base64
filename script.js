document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const base64Output = document.getElementById('base64Output');
    const convertButton = document.getElementById('convertButton');
    const copyButton = document.getElementById('copyButton');
    const message = document.getElementById('message');

    // **GANTI URL INI** dengan URL dasar proyek Anda
    // Pastikan URL mengarah ke folder/root tempat 'redirect.html' berada.
    const BASE_REDIRECT_URL = "https://masrahmat-id.github.io/konverter-base64/redirect.html?url=";

    // --- Fungsi untuk Encode URL ke Base64 ---
    function encodeToBase64(text) {
        // Menggunakan encodeURIComponent untuk menangani karakter khusus dan btoa() untuk Base64
        return btoa(unescape(encodeURIComponent(text)));
    }

    // --- Fungsi Konversi dan Generasi Link ---
    convertButton.addEventListener('click', () => {
        const url = urlInput.value.trim();
        base64Output.value = ''; // Bersihkan output sebelumnya
        message.textContent = ''; // Bersihkan pesan

        if (!url) {
            message.textContent = '⚠️ Harap masukkan URL atau teks.';
            message.className = 'message error';
            return;
        }

        try {
            // 1. Encode teks/link yang dimasukkan ke Base64
            const base64String = encodeToBase64(url);

            // 2. Gabungkan Base64 dengan URL redirect dasar
            const finalRedirectLink = BASE_REDIRECT_URL + base64String;
            
            // 3. Tampilkan hasil di kotak output
            base64Output.value = finalRedirectLink;
            message.textContent = '✅ Konversi berhasil! Salin link pengalihan di bawah.';
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
            // Untuk memastikan operasi copy bekerja dengan baik
            try {
                navigator.clipboard.writeText(base64Output.value)
                    .then(() => {
                        message.textContent = '📋 Link pengalihan berhasil disalin!';
                        message.className = 'message success';
                    })
                    .catch(() => {
                        // Fallback untuk browser lama
                        document.execCommand('copy');
                        message.textContent = '📋 Link pengalihan berhasil disalin! (Fallback)';
                        message.className = 'message success';
                    });
            } catch (e) {
                // Fallback untuk browser lama jika navigator.clipboard tidak tersedia
                document.execCommand('copy');
                message.textContent = '📋 Link pengalihan berhasil disalin! (Fallback)';
                message.className = 'message success';
            }
            
        } else {
            message.textContent = '⚠️ Tidak ada hasil untuk disalin.';
            message.className = 'message warning';
        }
    });
});
