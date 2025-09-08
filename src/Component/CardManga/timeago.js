function timeAgo(updateTime) {
    const now = new Date();
    const updated = new Date(updateTime);

    // tính chênh lệch mili-giây
    const diffMs = now - updated;
    const diffSeconds = Math.floor(diffMs / 1000);

    if (diffSeconds < 60) {
        return `${diffSeconds} GIÂY TRƯỚC`;
    }

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
        return `${diffMinutes} PHÚT TRƯỚC`;
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
        return `${diffHours} GIỜ TRƯỚC`;
    }

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) {
        return `${diffDays} NGÀY TRƯỚC`;
    }

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) {
        return `${diffMonths} THÁNG TRƯỚC`;
    }

    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} NĂM TRƯỚC`;
}

export {timeAgo}


