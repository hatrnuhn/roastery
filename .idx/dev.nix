# Import secrets
let 
  secrets = import ./.secrets.nix;
in
# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs
    pkgs.redis
    # pkgs.go
    # pkgs.python311
    # pkgs.python311Packages.pip
    # pkgs.nodejs_20
    # pkgs.nodePackages.nodemon
  ];

  # Runs redis service
  services.redis = {
    enable = true;
    port = 6379; # Optional: specify the port Redis should listen on
  };
  
  # Sets environment variables in the workspace
  # Uses secrets var
  env = pkgs.lib.recursiveUpdate {} secrets;
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];
    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
          # and show it in IDX's web preview panel
          command = [
            "npm" 
            "run" 
            "dev" 
            "--" 
            "--host" 
            "0.0.0.0" 
            "--port" 
            "$PORT"
          ];
          manager = "web";
          env = {
            # Environment variables to set for your server
            PORT = "$PORT";
            REDIS_HOST= "localhost";
            REDIS_PORT= "6379";
            SPOTIFY_API_URL="https://api.spotify.com/v1";
            SPOTIFY_AUTH_URL="https://accounts.spotify.com/api/token";
          };
        };
      };
    };
    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ ".idx/dev.nix" "README.md" ];
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}
