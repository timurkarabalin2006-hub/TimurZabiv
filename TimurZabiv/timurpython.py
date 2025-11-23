import turtle
def main():
    window = turtle.Screen()
    window.bgcolor("lightblue")

    timur = turtle.Turtle()
    timur.shape("turtle")
    timur.color("darkgreen")
    timur.speed(2)

    for _ in range(4):
        timur.forward(100)
        timur.right(90)

    timur.penup()
    timur.goto(-150, 0)
    timur.pendown()
    timur.color("red")

    for _ in range(36):
        timur.circle(50)
        timur.right(10)

    window.exitonclick()

if __name__ == "__main__":
    main()