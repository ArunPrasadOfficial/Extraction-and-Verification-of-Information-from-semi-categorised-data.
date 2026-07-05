import mysql.connector


def get_connection():
    """
    Create MySQL database connection
    """
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234567890",
        database="extraction_db"
    )


def insert_data(data, status):
    """
    Insert extracted information into MySQL
    """

    db = get_connection()
    cursor = db.cursor()

    sql = """
    INSERT INTO information
    (
        name,
        phone,
        email,
        course,
        address,
        college,
        document_date,
        verification_status
    )
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        data.get("name", ""),
        data.get("phone", ""),
        data.get("email", ""),
        data.get("course", ""),
        data.get("address", ""),
        data.get("college", ""),
        data.get("date", ""),
        status
    )

    cursor.execute(sql, values)

    db.commit()

    cursor.close()
    db.close()