from flask import Flask, request
from flaskext.mysql import MySQL
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'mudar123'
app.config['MYSQL_DATABASE_DB'] = 'AC02'
app.config['MYSQL_DATABASE_HOST'] = '172.17.0.3'
mysql = MySQL(app)


@app.route('/gravar', methods=['POST', 'GET'])
def gravar():
    try:
        json = request.get_json()
        _nome = json['nome']
        _endereco = json['endereco']
        _telefone = json['telefone']

        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute('insert into tbl_cadastro (user_name, user_endereco, user_telefone) VALUES (%s, %s, %s)', (_nome, _endereco, _telefone))
        conn.commit()

        return {'primeironome': _nome}

    except Exception as e:
        return str(e)  # Retornando uma mensagem de erro se houver algum problema


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)