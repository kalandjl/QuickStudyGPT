FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./start.sh ./start.sh

RUN curl -fsSL https://deno.land/x/install/install.sh | sh
ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

RUN chmod +x ./start.sh 

EXPOSE 4000

CMD ["bash", "start.sh"]
