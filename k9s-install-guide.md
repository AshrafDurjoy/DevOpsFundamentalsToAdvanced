# Installing K9s on macOS

K9s is a terminal-based UI for interacting with Kubernetes clusters. Here are multiple ways to install K9s on macOS:

## Method 1: Using Homebrew (Recommended)

The simplest way to install K9s on macOS is using Homebrew:

```bash
# Update Homebrew
brew update

# Install K9s
brew install k9s
```

After installation, you can run K9s by simply typing:

```bash
k9s
```

## Method 2: Using Binary Release

If you don't want to use Homebrew, you can download the binary directly:

1. Visit the [K9s releases page](https://github.com/derailed/k9s/releases)
2. Download the latest release for macOS (Darwin)
3. Extract the archive
4. Move the binary to your PATH:

```bash
# Example for macOS ARM64 (Apple Silicon)
curl -L https://github.com/derailed/k9s/releases/download/v0.27.4/k9s_Darwin_arm64.tar.gz -o k9s.tar.gz

# For Intel Mac, use:
# curl -L https://github.com/derailed/k9s/releases/download/v0.27.4/k9s_Darwin_x86_64.tar.gz -o k9s.tar.gz

# Extract
tar -xzf k9s.tar.gz

# Make executable
chmod +x k9s

# Move to a directory in your PATH
sudo mv k9s /usr/local/bin/
```

## Method 3: Using MacPorts

If you use MacPorts:

```bash
sudo port install k9s
```

## Method 4: Using asdf Version Manager

If you use the asdf version manager:

```bash
# Add the plugin
asdf plugin add k9s

# Install the latest version
asdf install k9s latest

# Set it as global
asdf global k9s latest
```

## Verifying the Installation

To verify K9s is installed properly, run:

```bash
k9s version
```

You should see the version information displayed in your terminal.

## Running K9s

Once installed, make sure your kubeconfig is properly set up, then simply run:

```bash
k9s
```

This will start the K9s interface connected to your current kubernetes context.
