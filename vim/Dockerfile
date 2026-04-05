FROM debian:bookworm-slim

# Install vim, git (needed by vim-plug to clone plugins), curl, and ca-certificates
RUN apt-get update && apt-get install -y --no-install-recommends \
        vim \
        git \
        curl \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install vim-plug
RUN curl -fLo /root/.vim/autoload/plug.vim --create-dirs \
        https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

# Copy the minimalist .vimrc
COPY .vimrc /root/.vimrc

# Pre-install all plugins non-interactively
RUN vim -E -s -u /root/.vimrc +PlugInstall +qall; exit 0

# Mount your content/ directory here
WORKDIR /content

ENTRYPOINT ["vim"]
