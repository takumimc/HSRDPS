class SpCounter:
    def __init__(self):
        self.sp = 3

    def increase(self):
        if self.sp < 5:
            self.sp += 1
        elif self.sp == 5:
            self.sp == 5

    def decrease(self):
        if self.sp > 0:
            self.sp -= 1
        elif self.sp == 0:
            self.sp = 0


# test = SpCounter()
# test.increase()
# print(test.sp)
# test.decrease()
# print(test.sp)
