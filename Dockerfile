FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# إعداد المنفذ ليتوافق مع متطلبات Google Cloud Run
EXPOSE 8080
ENV PORT=8080
ENV HOST=0.0.0.0

# إجبار Next.js للعمل على المنفذ 8080 وقبول كافة الاتصالات الخارجية
CMD ["npx", "next", "start", "-H", "0.0.0.0", "-p", "8080"]