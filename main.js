import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

let prev_tickets_remaining = '';

dotenv.config();

function send_notif(ticket, prev_tickets_remaining, condition) {
    let ticket_type;

    if (ticket.includes('EARLY')) {
        ticket_type = 'early bird';
    } else if (ticket.includes('STANDARD')) {
        ticket_type = 'standard';
    } else if (ticket.includes('LATE')) {
        ticket_type = 'late bird';
    }

    let tickets_remaining;

    if (condition == true) {
        tickets_remaining = $(elem).text().slice(-3);
    } else {
        tickets_remaining = ticket.split("▶")[1];
    }

    if (prev_tickets_remaining.slice(0,2) !== tickets_remaining.slice(0,2)) {
        try {
            fetch(process.env.WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    embeds: [{
                        title: "LeHACK Ticket Update",
                        description: "",
                        color: 5814783,
                        fields: [
                            {
                                name: "Current Ticket type",
                                value: ticket_type,
                                inline: false
                            },
                            {
                                name: "Tickets Remaining",
                                value: tickets_remaining,
                                inline: true
                            }
                        ],
                        timestamp: new Date().toISOString()
                    }]
                })
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
            });
        } catch (error) {
            console.log(`Error fetching URL: ${error}`);
        }
    }
    prev_tickets_remaining = tickets_remaining;
}

function main() {
    cheerio.fromURL('https://lehack.org')
        .then($ => {
            $('div.event__tarif.tarif_dispo').each((i, elem) => {
                const ticket = $(elem).text();

                if (ticket.includes('%')) {
                    send_notif(ticket, prev_tickets_remaining, true);
                } else {
                    send_notif(ticket, prev_tickets_remaining, false);
                }
            });
        });
}

const ticket_check_interval = setInterval(main, 1800000);
