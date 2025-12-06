"""Utility functions for PayFlow backend."""
import socket


def get_lan_ip() -> str:
    """
    Detect the machine's true LAN IP address.
    
    Uses a dummy UDP connection to determine which network interface
    would be used for outbound connections, avoiding localhost/127.0.0.1.
    
    Returns:
        str: The LAN IP address (e.g., "192.168.1.45")
    """
    try:
        # Create a dummy UDP socket
        # We don't actually send data, just use it to find the outbound interface
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            # Connect to Google's DNS (8.8.8.8) on port 80
            # This doesn't actually send any packets
            s.connect(("8.8.8.8", 80))
            # Get the socket's own address
            lan_ip = s.getsockname()[0]
            return lan_ip
    except Exception as e:
        # Fallback to localhost if something goes wrong
        print(f"Error detecting LAN IP: {e}")
        return "127.0.0.1"
