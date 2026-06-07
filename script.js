//dark mode
const toggle = document.querySelector('.dark-mode-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
//dark mode END
//responsiv navbar
//responsiv navbar END





document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("grafikSawit");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 850;
    canvas.height = 350;
    const data6 = {
        bulan: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
        nilai: [80, 120, 170, 220, 180, 245]
    };
    const data12 = {
        bulan: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
        nilai: [80, 120, 170, 220, 180, 245, 260, 280, 250, 300, 320, 350]
    };
    let dataAktif = data6;
    gambarGrafik(data6);
    document
        .getElementById("periodeGrafik")
        .addEventListener("change", function () {
            const dataTujuan =
                this.value === "6"
                    ? data6
                    : data12;
            animasiGrafik(
                dataAktif,
                dataTujuan
            );
            dataAktif = dataTujuan;
        });
    function animasiGrafik(dataAwal, dataAkhir) {
        let frame = 0;
        const totalFrame = 35;
        function animate() {
            frame++;
            const progress =
                frame / totalFrame;
            const jumlahTitik =
                Math.round(
                    dataAwal.nilai.length +
                    (
                        dataAkhir.nilai.length -
                        dataAwal.nilai.length
                    ) * progress
                );
            const dataAnimasi = {
                bulan: dataAkhir.bulan.slice(
                    0,
                    jumlahTitik
                ),
                nilai: dataAkhir.nilai.slice(
                    0,
                    jumlahTitik
                )
            };
            gambarGrafik(dataAnimasi);
            if (frame < totalFrame) {
                requestAnimationFrame(
                    animate
                );
            } else {
                gambarGrafik(
                    dataAkhir
                );
            }
        }
        animate();
    }

    function gambarGrafik(data) {
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
        const nilaiTertinggi =
            Math.max(...data.nilai);
        const batasAtas =
            nilaiTertinggi + 80;
        const tinggiGrafik = 250;
        const lebarGrafik = 700;
        const jarak =
            lebarGrafik /
            Math.max(
                1,
                data.nilai.length - 1
            );

        function konversiY(nilai) {

            return (
                300 -
                (nilai / batasAtas) *
                tinggiGrafik
            );
        }

        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;

        for (let i = 0; i <= 6; i++) {

            const y =
                50 + (i * 40);

            ctx.beginPath();
            ctx.moveTo(50, y);
            ctx.lineTo(760, y);
            ctx.stroke();
        }

        ctx.beginPath();

        ctx.moveTo(
            50,
            konversiY(data.nilai[0])
        );

        for (let i = 1; i < data.nilai.length; i++) {

            ctx.lineTo(
                50 + (i * jarak),
                konversiY(data.nilai[i])
            );
        }

        ctx.strokeStyle = "#2f8f46";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.lineTo(
            50 + ((data.nilai.length - 1) * jarak),
            300
        );

        ctx.lineTo(
            50,
            300
        );

        ctx.fillStyle =
            "rgba(47,143,70,.12)";

        ctx.fill();

        for (let i = 0; i < data.nilai.length; i++) {

            const x =
                50 + (i * jarak);

            const y =
                konversiY(data.nilai[i]);

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                6,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "#2f8f46";

            ctx.fill();

            ctx.fillStyle =
                "#222";

            ctx.font =
                "bold 13px Poppins";

            ctx.fillText(
                data.nilai[i],
                x - 12,
                y - 15
            );

            ctx.fillStyle =
                "#666";

            ctx.fillText(
                data.bulan[i],
                x - 10,
                330
            );
        }
    }

    const agendaList =
        document.getElementById(
            "agendaList"
        );

    if (agendaList) {

        agendaList.innerHTML = `

        <div class="itemAgenda">
            <div class="tanggalAgenda">
                <span>15</span>
                <small>MEI</small>
            </div>

            <div class="infoAgenda">
                <h4>Pemupukan Rutin</h4>
                <p>Blok C - 2 Ha</p>
            </div>

            <div class="jamAgenda">
                08:00
            </div>
        </div>

        <div class="itemAgenda">
            <div class="tanggalAgenda">
                <span>22</span>
                <small>MEI</small>
            </div>

            <div class="infoAgenda">
                <h4>Monitoring Hama</h4>
                <p>Blok A - 3 Ha</p>
            </div>

            <div class="jamAgenda">
                09:00
            </div>
        </div>

        <div class="itemAgenda">
            <div class="tanggalAgenda">
                <span>30</span>
                <small>MEI</small>
            </div>

            <div class="infoAgenda">
                <h4>Panen TBS</h4>
                <p>Blok A - 2 Ha</p>
            </div>

            <div class="jamAgenda">
                07:00
            </div>
        </div>

        `;
    }

    const agendaTambahan =
document.getElementById(
    "agendaTambahan"
);

agendaTambahan.innerHTML = `

<div class="itemAgenda">
    <div class="tanggalAgenda">
        <span>03</span>
        <small>JUN</small>
    </div>

    <div class="infoAgenda">
        <h4>Penyemprotan Gulma</h4>
        <p>Blok D - 1,5 Ha</p>
    </div>

    <div class="jamAgenda">
        08:30
    </div>
</div>

<div class="itemAgenda">
    <div class="tanggalAgenda">
        <span>08</span>
        <small>JUN</small>
    </div>

    <div class="infoAgenda">
        <h4>Pemupukan NPK</h4>
        <p>Blok B - 4 Ha</p>
    </div>

    <div class="jamAgenda">
        07:00
    </div>
</div>

<div class="itemAgenda">
    <div class="tanggalAgenda">
        <span>14</span>
        <small>JUN</small>
    </div>

    <div class="infoAgenda">
        <h4>Monitoring Produksi</h4>
        <p>Seluruh Area</p>
    </div>

    <div class="jamAgenda">
        09:00
    </div>
</div>

<div class="itemAgenda">
    <div class="tanggalAgenda">
        <span>19</span>
        <small>JUN</small>
    </div>

    <div class="infoAgenda">
        <h4>Panen Tahap II</h4>
        <p>Blok A - 3 Ha</p>
    </div>

    <div class="jamAgenda">
        06:30
    </div>
</div>

<div class="itemAgenda">
    <div class="tanggalAgenda">
        <span>27</span>
        <small>JUN</small>
    </div>

    <div class="infoAgenda">
        <h4>Evaluasi Bulanan</h4>
        <p>Kantor Kebun</p>
    </div>

    <div class="jamAgenda">
        10:00
    </div>
</div>
`;
const tombolAgenda =
document.getElementById(
    "toggleAgenda"
);
const kalenderLengkap =
document.getElementById(
"kalenderLengkap"
);
tombolAgenda.addEventListener(
"click",

function(){
    agendaTambahan.classList.toggle(
    "show"
    );
    kalenderLengkap.classList.toggle(
    "show"
    );
    if(
    agendaTambahan.classList.contains(
    "show"
    )
    ){
        this.textContent =
        "Sembunyikan Jadwal";
        kalenderLengkap.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });
    }
    else{
        this.textContent =
        "Lihat Semua Jadwal";
    }
});})
