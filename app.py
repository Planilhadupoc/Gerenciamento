import streamlit as st
import pandas as pd

# Título da aplicação
st.title("Gerenciamento de Banca - Meta de 15% e Stop Loss de 10%")

# Entrada de dados
banca_inicial = st.number_input("Insira sua banca inicial (R$):", min_value=0.0)
resultado_dia = st.number_input("Resultado do dia (positivo ou negativo):", value=0.0)

# Cálculos de meta e stop loss
meta = banca_inicial * 0.15
stop_loss = banca_inicial * 0.10

# Botão para atualizar
if st.button("Atualizar"):
    nova_banca = banca_inicial + resultado_dia
    st.success(f"Banca Atual: R$ {nova_banca:.2f}")
    st.write(f"Meta de Lucro: R$ {meta:.2f}")
    st.write(f"Stop Loss: R$ {stop_loss:.2f}")

# Exemplo de tabela
data = {
    "Banca Atual": [banca_inicial, nova_banca],
    "Meta (15%)": [meta, nova_banca * 0.15],
    "Stop Loss (10%)": [stop_loss, nova_banca * 0.10],
}
df = pd.DataFrame(data)

st.table(df)

# Gráfico (Exemplo)
st.line_chart(df["Banca Atual"])
