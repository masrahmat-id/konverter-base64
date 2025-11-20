document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const base64Output = document.getElementById('base64Output');
    const convertButton = document.getElementById('convertButton');
    const copyButton = document.getElementById('copyButton');
    const message = document.getElementById('message');

    // --- Fungsi Konversi ---
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
            // Menggunakan btoa() untuk mengkodekan string ke Base64.
            // encodeURIComponent memastikan karakter non-ASCII (seperti é, ü) ditangani dengan benar.
            const base64String = btoa(unescape(encodeURIComponent(url)));
            base64Output.value = base64String;
            message.textContent = '✅ Konversi berhasil!';
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
            message.textContent = '📋 Hasil Base64 berhasil disalin!';
            message.className = 'message success';
        } else {
            message.textContent = '⚠️ Tidak ada hasil untuk disalin.';
            message.className = 'message warning';
        }
    });
});
