
export function timeAgo(timestamp) {
    // Parse the timestamp string into a Date object
    const timestampDate = new Date(timestamp?.replace(' ', 'T')); // Replace space with 'T' for proper parsing

    // Calculate the time difference in seconds
    const seconds = Math.floor((Date.now() - timestampDate) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        const count = Math.floor(seconds / interval.seconds);

        if (count >= 1) {
            return `${count} ${interval.label}${count === 1 ? '' : 's'} ago`;
        }
    }

    return 'just now';
}


export function timeDiff(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1); // Convert the MySQL timestamp to a JavaScript Date object
    const date2 = new Date(timestamp2);
  
    const timeDifferenceInSeconds = Math.floor(Math.abs((date1 - date2) / 1000)); // Calculate the time difference in seconds
  
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} seconds`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (timeDifferenceInSeconds < 2592000) { // Approximately 30 days
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} `;
    } else if (timeDifferenceInSeconds < 31536000) { // Approximately 365 days
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      return `${years} year${years > 1 ? 's' : ''}`;
    }
}
  
export function readableDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Use 12-hour time format with AM/PM
    };
    return date.toLocaleDateString(undefined, options);
}