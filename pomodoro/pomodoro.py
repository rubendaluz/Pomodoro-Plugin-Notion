import tkinter as tk
import time
import pygame

pygame.init()


def play_alarm():
    # Load the sound file
    sound_file = (
        "sounds/alarm-clock-short-6402.mp3"  # Replace with the path to your sound file
    )
    pygame.mixer.music.load(sound_file)

    # Play the sound
    pygame.mixer.music.play()

    # Add some delay to let the sound play
    pygame.time.delay(
        3000
    )  # This will pause the program for 3 seconds (3000 milliseconds)

    # Stop the sound
    pygame.mixer.music.stop()


def set_work_time(time):
    global work_time
    work_time = time


def set_rest_time(time):
    global rest_time
    rest_time = time


def pomodoro():
    laps = 0
    while laps <= 5:
        work_time_finished = temporizador(work_time, "Work Time")
        play_alarm()
        if work_time_finished is True:
            temporizador(rest_time, "Rest Time")
            play_alarm()
            laps += 1
            break


def temporizador(tempo, text):
    for i in range(int(tempo), 0, -1):
        mins = i // 60
        seg = i % 60
        time_label.config(text=f"{text}:\n{mins}:{seg}")
        root.update()  # Atualizar a interface para mostrar a contagem atualizada
        time.sleep(1)
    return True


# Create the main application window
root = tk.Tk()
root.title("Pomodoro")

# Criar opções de tempo de trabalho
trabalho_times = tk.Label(
    root, font=("Helvetica", 12), fg="black", text="Selecione o tempo de trabalho"
)
trabalho_times.pack()

btn_trabalho_1 = tk.Button(
    root, text="25 min", command=lambda: set_work_time(25 * 60), state=tk.ACTIVE
)
btn_trabalho_1.pack(pady=5, padx=10)
btn_trabalho_2 = tk.Button(root, text="30 min", command=lambda: set_work_time(30 * 60))
btn_trabalho_2.pack(pady=5, padx=10)
btn_trabalho_3 = tk.Button(root, text="45 min", command=lambda: set_work_time(45 * 60))
btn_trabalho_3.pack(pady=5, padx=10)

# Opções de tempo de descanso
rest_times = tk.Label(
    root, font=("Helvetica", 12), fg="black", text="Selecione o intervalo de descanso"
)
rest_times.pack()

btn_descanso_1 = tk.Button(
    root, text="5 min", command=lambda: set_rest_time(5 * 60), state=tk.ACTIVE
)
btn_descanso_1.pack(pady=5, padx=15)
btn_descanso_2 = tk.Button(root, text="10 min", command=lambda: set_rest_time(10 * 60))
btn_descanso_2.pack(pady=5, padx=10)
btn_descanso_3 = tk.Button(root, text="15 min", command=lambda: set_rest_time(15 * 60))
btn_descanso_3.pack(pady=5, padx=10)

# Create a label to display the time
time_label = tk.Label(root, font=("Helvetica", 24), fg="black")
time_label.pack(pady=20)

# Crie um botão para iniciar temporizador
start_btn = tk.Button(root, text="Iniciar", command=pomodoro)
start_btn.pack(pady=10)

pause_btn = tk.Button(root, text="Pausar")
pause_btn.pack(pady=10)

# Centralizar tudo na janela
root.pack_propagate(0)

# Start the main event loop
root.mainloop()
