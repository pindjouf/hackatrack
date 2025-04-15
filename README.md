# HackATrack

A simple tracker to make sure we're not missing the last tickets for LeHACK "The Singularity: ACQUIRED HUMAN OBSOLESCENCE edition" happening June 27-29, 2025!

- Sends Discord notifications when ticket availability percentages change
- Runs hourly checks to keep you updated

## Installation

```bash
# Clone the repository
git clone https://github.com/pindjouf/hackatrack.git
cd hackatrack

# Install dependencies
npm install cheerio dotenv
```

## Configuration

1. Create a Discord webhook in your server (Server Settings → Integrations → Webhooks → New Webhook)
2. Create a `.env` file in the project root with your webhook URL:

```
WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_id/your_webhook_token
```

## Usage

```bash
# Run the tracker once
node tracker.js

# For continuous monitoring, use PM2
npm install -g pm2
pm2 start tracker.js --name "lehack-tickets"
pm2 save

# To view logs
pm2 logs lehack-tickets
```

## How It Works

The tracker uses Cheerio to scrape the LeHACK website and extract ticket availability information. It maintains a simple state between runs to track percentage changes, sending Discord notifications via webhook only when availability actually changes.

## License

This *project* is licensed under the WTFPL License - see the [LICENSE](LICENSE) file for details.
