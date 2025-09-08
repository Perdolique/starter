FROM postgres:17

# Install curl
RUN apt-get update && apt-get install -y curl

# Install pg_uuidv7
RUN cd "$(mktemp -d)" && \
    curl -LO "https://github.com/fboulnois/pg_uuidv7/releases/download/v1.6.0/pg_uuidv7.tar.gz" && \
    tar xf pg_uuidv7.tar.gz && \
    cp "17/pg_uuidv7.so" "$(pg_config --pkglibdir)" && \
    cp pg_uuidv7--1.6.sql pg_uuidv7.control "$(pg_config --sharedir)/extension"

EXPOSE 5432

CMD ["postgres"]
