def verify_data(data):
    """
    Verification Logic:
    - If at least one field has valid data → Verified
    - If all fields are Missing or empty → Not Verified
    """

    for value in data.values():
        value = str(value).strip()

        if value != "" and value.lower() != "missing":
            return "Verified"

    return "Not Verified"
