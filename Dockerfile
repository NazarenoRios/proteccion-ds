FROM node:20-alpine

RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 -G nodejs

WORKDIR /app

COPY --chown=appuser:nodejs package*.json ./

RUN npm install

COPY --chown=appuser:nodejs . .

USER appuser

EXPOSE 6006

CMD ["npm", "run", "storybook"] 