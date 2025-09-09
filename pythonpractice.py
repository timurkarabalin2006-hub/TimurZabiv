
last_name = input("Enter your last name: ")
first_name = input("Enter your first name: ")
patronymic = input("Enter your patronymic: ")


print(f"{last_name} = {first_name} = {patronymic}")


print(f"{first_name} → {patronymic} → {last_name}")


if last_name.endswith("ov"):
    feminine = last_name[:-2] + "ova"
elif last_name.endswith("ev"):
    feminine = last_name[:-2] + "eva"
else:
    feminine = last_name + "a"   

print(f"Masculine: {last_name}, Feminine: {feminine}")
day = input("Enter day of birth (dd): ")
month = input("Enter month of birth (mm): ")
year = input("Enter year of birth (yyyy): ")
print(f"With dots: {day}.{month}.{year}")
print(f"With spaces: {day} {month} {year}")
print(f"With dashes: {day}-{month}-{year}")