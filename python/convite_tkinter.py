"""
Convite especial para a professora ser paraninfa da turma 3°A.
Versão Python (Tkinter) do convite web.

Troque [NOME DA PROFESSORA] e [CURSO] pelo texto real antes de usar.
Coloque GIFs em ../assets/gifs/comemoracaoN.gif e uma foto em
../assets/fotos/foto-turma.jpg (veja os LEIA-ME.txt de cada pasta).
"""

import os
import random
import tkinter as tk

try:
    import winsound
    TEM_SOM = True
except ImportError:
    TEM_SOM = False

NOME_PROFESSORA = "[NOME DA PROFESSORA]"
CURSO = "[CURSO]"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
GIFS_DIR = os.path.join(BASE_DIR, "..", "assets", "gifs")

FRASES_ZOEIRA = [
    "Hmm, quase! 😏",
    "Nada disso, tenta de novo 😂",
    "Esse botão não quer ser clicado...",
    "Só clicando no SIM mesmo 💚",
    "Ele é rápido, né? 🏃💨",
    "A resposta certa é só uma...",
    "Desiste, o 'Não' fugiu de vez 🙈",
    "O universo conspira a favor do SIM ✨",
]

CORES_CONFETE = ["#2ecc71", "#27ae60", "#f1c40f", "#e74c3c", "#3498db", "#ffffff"]


class GifAnimado:
    """Carrega um GIF (multi-frame) usando só tkinter.PhotoImage.
    Se o arquivo não existir, fica marcado como indisponível."""

    def __init__(self, caminho):
        self.frames = []
        self.disponivel = False
        indice = 0
        while True:
            try:
                frame = tk.PhotoImage(file=caminho, format=f"gif -index {indice}")
                self.frames.append(frame)
                indice += 1
            except tk.TclError:
                break
        self.disponivel = len(self.frames) > 0

    def animar(self, label, i=0, atraso=90):
        if not self.disponivel:
            return
        frame = self.frames[i % len(self.frames)]
        label.configure(image=frame)
        label.image = frame
        label.after(atraso, lambda: self.animar(label, i + 1, atraso))


class ConviteApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Convite Especial 🎓")
        self.root.geometry("800x600")
        self.root.configure(bg="#12241c")
        self.root.minsize(600, 480)

        self.tentativas = 0
        self.btn_nao = None
        self.container = None

        self._tela_convite()

    # ---------- Tela 1: convite ----------
    def _tela_convite(self):
        self._limpar_janela()

        self.container = tk.Frame(self.root, bg="#12241c")
        self.container.pack(fill="both", expand=True)

        tk.Label(
            self.container, text="🎓✨", font=("Segoe UI Emoji", 32), bg="#12241c"
        ).pack(pady=(40, 4))

        tk.Label(
            self.container,
            text="Um pedido muito especial...",
            font=("Segoe UI", 20, "bold"),
            fg="white",
            bg="#12241c",
        ).pack(pady=(0, 20))

        tk.Label(
            self.container,
            text=f"Professora {NOME_PROFESSORA},\n"
                 f"a turma {CURSO} — 3°A gostaria de saber:",
            font=("Segoe UI", 12),
            fg="white",
            bg="#12241c",
            justify="center",
        ).pack(pady=(0, 16))

        tk.Label(
            self.container,
            text="Você aceita ser a nossa paraninfa? 💚",
            font=("Segoe UI", 16, "bold"),
            fg="#2ecc71",
            bg="#12241c",
        ).pack(pady=(0, 30))

        botoes_frame = tk.Frame(self.container, bg="#12241c")
        botoes_frame.pack()

        btn_sim = tk.Button(
            botoes_frame,
            text="SIM! 💚",
            font=("Segoe UI", 13, "bold"),
            bg="#2ecc71",
            fg="white",
            activebackground="#27ae60",
            activeforeground="white",
            relief="flat",
            padx=28,
            pady=12,
            cursor="hand2",
            command=self._tela_comemoracao,
        )
        btn_sim.pack(side="left", padx=16)

        self.btn_nao = tk.Button(
            self.container,
            text="Não",
            font=("Segoe UI", 13, "bold"),
            bg="#e74c3c",
            fg="white",
            relief="flat",
            padx=28,
            pady=12,
            cursor="hand2",
        )

        self.mensagem = tk.Label(
            self.container, text="", font=("Segoe UI", 10, "italic"),
            fg="#cccccc", bg="#12241c",
        )
        self.mensagem.pack(pady=(90, 0))

        self.root.update_idletasks()
        largura_frame = self.container.winfo_width() or 800
        self.btn_nao.place(
            x=largura_frame // 2 + 70,
            y=botoes_frame.winfo_y() + 190,
        )

        self.btn_nao.bind("<Enter>", self._fugir)
        self.btn_nao.bind("<Button-1>", self._fugir)
        self.container.bind("<Motion>", self._checar_proximidade)
        self.root.bind("<Configure>", lambda e: None)

    def _checar_proximidade(self, event):
        if not self.btn_nao or not self.btn_nao.winfo_ismapped():
            return
        bx = self.btn_nao.winfo_x() + self.btn_nao.winfo_width() / 2
        by = self.btn_nao.winfo_y() + self.btn_nao.winfo_height() / 2
        dist = ((event.x - bx) ** 2 + (event.y - by) ** 2) ** 0.5
        if dist < 90:
            self._fugir()

    def _fugir(self, event=None):
        self.root.update_idletasks()
        largura = self.container.winfo_width() or 800
        altura = self.container.winfo_height() or 600
        bw = self.btn_nao.winfo_width() or 90
        bh = self.btn_nao.winfo_height() or 44
        margem = 20

        novo_x = random.randint(margem, max(margem + 1, largura - bw - margem))
        novo_y = random.randint(margem, max(margem + 1, altura - bh - margem))
        self.btn_nao.place(x=novo_x, y=novo_y)

        self.tentativas += 1
        frase = FRASES_ZOEIRA[min(self.tentativas - 1, len(FRASES_ZOEIRA) - 1)]
        self.mensagem.configure(text=frase)
        return "break"

    # ---------- Tela 2: comemoração ----------
    def _tela_comemoracao(self):
        self._limpar_janela()
        self._tocar_som()

        self.container = tk.Frame(self.root, bg="#12241c")
        self.container.pack(fill="both", expand=True)

        tk.Label(
            self.container, text="🎉🥳🎓🥳🎉", font=("Segoe UI Emoji", 28), bg="#12241c"
        ).pack(pady=(30, 4))

        tk.Label(
            self.container,
            text="ELA ACEITOU!!! 🎊",
            font=("Segoe UI", 22, "bold"),
            fg="#2ecc71",
            bg="#12241c",
        ).pack(pady=(0, 12))

        tk.Label(
            self.container,
            text=f"Obrigado por fazer parte da nossa jornada, {NOME_PROFESSORA}!\n"
                 f"Vamos comemorar com a turma 3°A! 💚🎓",
            font=("Segoe UI", 11),
            fg="white",
            bg="#12241c",
            justify="center",
        ).pack(pady=(0, 20))

        self._area_gifs()

        tk.Button(
            self.container,
            text="Ver de novo 🔁",
            font=("Segoe UI", 11, "bold"),
            bg="#2ecc71",
            fg="white",
            relief="flat",
            padx=20,
            pady=8,
            cursor="hand2",
            command=self._tela_convite,
        ).pack(pady=20)

        self.canvas_confete = tk.Canvas(
            self.container, bg="#12241c", highlightthickness=0, height=1
        )
        self._iniciar_confete()

    def _area_gifs(self):
        gifs_frame = tk.Frame(self.container, bg="#12241c")
        gifs_frame.pack()

        nomes_gifs = ["party.gif", "bread-cat.gif", "dog_dacing.gif", "hello-human.gif"]

        self._gifs = []
        for i, nome_arquivo in enumerate(nomes_gifs):
            caminho = os.path.join(GIFS_DIR, nome_arquivo)
            slot = tk.Frame(gifs_frame, bg="#1c3328", width=140, height=140)
            slot.grid(row=i // 2, column=i % 2, padx=8, pady=8)
            slot.grid_propagate(False)

            label = tk.Label(slot, bg="#1c3328")
            label.place(relx=0.5, rely=0.5, anchor="center")

            gif = None
            if os.path.exists(caminho):
                gif = GifAnimado(caminho)

            if gif and gif.disponivel:
                self._gifs.append(gif)
                gif.animar(label)
            else:
                label.configure(
                    text="🎉\n%s" % nome_arquivo,
                    font=("Segoe UI", 10),
                    fg="#7fae98",
                    justify="center",
                )

    def _iniciar_confete(self):
        self.canvas_confete = tk.Canvas(self.root, bg="", highlightthickness=0)
        self.canvas_confete.place(x=0, y=0, relwidth=1, relheight=1)
        self.canvas_confete.lower()

        self.root.update_idletasks()
        largura = self.root.winfo_width()
        altura = self.root.winfo_height()

        self.particulas = []
        for _ in range(120):
            x = random.randint(0, largura)
            y = random.randint(-altura, 0)
            item = self.canvas_confete.create_rectangle(
                x, y, x + 6, y + 10,
                fill=random.choice(CORES_CONFETE), width=0,
            )
            self.particulas.append([item, random.uniform(2, 5), random.uniform(-1.5, 1.5)])

        self._animar_confete(altura)

    def _animar_confete(self, altura):
        algum_visivel = False
        for item, vel_y, vel_x in self.particulas:
            self.canvas_confete.move(item, vel_x, vel_y)
            _, y0, _, _ = self.canvas_confete.coords(item)
            if y0 < altura + 20:
                algum_visivel = True

        if algum_visivel and self.canvas_confete.winfo_exists():
            self.root.after(30, lambda: self._animar_confete(altura))

    def _tocar_som(self):
        if not TEM_SOM:
            return
        try:
            for freq in (523, 659, 784, 1046):
                winsound.Beep(freq, 90)
        except Exception:
            pass

    # ---------- utilitário ----------
    def _limpar_janela(self):
        for widget in self.root.winfo_children():
            widget.destroy()


if __name__ == "__main__":
    root = tk.Tk()
    app = ConviteApp(root)
    root.mainloop()
