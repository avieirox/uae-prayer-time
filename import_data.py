import mysql.connector
import csv

# Configuración de conexión a la base de datos
DB_CONFIG = {
    'host': 'dafne.dns-es.com',
    'port': 3306,
    'user': 'uaeprayertime_uaeprayertime_app',
    'password': 'n0ses@be',
    'database': 'uaeprayertime_prayertimes_db'
}

# Ruta al archivo CSV
CSV_FILE = r'C:\Users\aviei\Documents\PayerTimes\Application\Dubai.csv'

# Nombre de la tabla en la base de datos
TABLE_NAME = "mosques"

def normalize_value(value):
    """Normaliza valores del CSV: vacíos a NULL, otros sin espacios."""
    return value.strip() if value and value.strip() else None

def load_csv_to_db(cursor, csv_file):
    with open(csv_file, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        
        # Recorrer las filas del CSV e insertar en la base de datos
        for row in reader:
            # Normalizar cada valor de la fila
            normalized_row = {key: normalize_value(value) for key, value in row.items()}

            # Construir la consulta INSERT
            insert_query = f"""
            INSERT INTO {TABLE_NAME} (
                wheelchair_accessible_entrance,
                wheelchair_accessible_parking,
                women_prayer_section,
                address,
                city,
                country_code,
                latitud,
                longituf,
                neighborhood,
                openinghours_0_day,
                openinghours_0_hours,
                openinghours_1_day,
                openinghours_1_hours,
                openinghours_2_day,
                openinghours_2_hours,
                openinghours_3_day,
                openinghours_3_hours,
                openinghours_4_day,
                openinghours_4_hours,
                openinghours_5_day,
                openingHours_5_hours,
                openinghours_6_day,
                openinghours_6_hours,
                phone,
                reviews_count,
                search_pageurl,
                state,
                street,
                title,
                url_slug,
                image_name,
                total_score,
                url_google,
                website
            ) VALUES (
                %(wheelchair_accessible_entrance)s,
                %(wheelchair_accessible_parking)s,
                %(women_prayer_section)s,
                %(address)s,
                %(city)s,
                %(country_code)s,
                %(latitud)s,
                %(longituf)s,
                %(neighborhood)s,
                %(openinghours_0_day)s,
                %(openinghours_0_hours)s,
                %(openinghours_1_day)s,
                %(openinghours_1_hours)s,
                %(openinghours_2_day)s,
                %(openinghours_2_hours)s,
                %(openinghours_3_day)s,
                %(openinghours_3_hours)s,
                %(openinghours_4_day)s,
                %(openinghours_4_hours)s,
                %(openinghours_5_day)s,
                %(openingHours_5_hours)s,
                %(openinghours_6_day)s,
                %(openinghours_6_hours)s,
                %(phone)s,
                %(reviews_count)s,
                %(search_pageurl)s,
                %(state)s,
                %(street)s,
                %(title)s,
                %(url_slug)s,
                %(image_name)s,
                %(total_score)s,
                %(url_google)s,
                %(website)s
            );
            """
            # Ejecutar la consulta
            cursor.execute(insert_query, normalized_row)

def main():
    try:
        # Conexión a la base de datos
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()

        # Cargar datos del CSV
        load_csv_to_db(cursor, CSV_FILE)

        # Confirmar los cambios
        connection.commit()
        print("Datos importados exitosamente.")
    except mysql.connector.Error as e:
        print(f"Error al conectar o insertar datos: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("Conexión cerrada.")

if __name__ == "__main__":
    main()
