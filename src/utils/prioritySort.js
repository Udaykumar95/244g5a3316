export const PRIORITY_VALUES = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export function getPriorityValue(type) {
  return PRIORITY_VALUES[type] || 0;
}

export function sortByPriority(notifications) {
  return [...notifications].sort((first, second) => {
    const priorityDifference =
      getPriorityValue(second.type) - getPriorityValue(first.type);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    // If priorities are equal, the latest notification should come first.
    return new Date(second.timestamp) - new Date(first.timestamp);
  });
}

export function getTopPriorityNotifications(notifications, limit = 10) {
  return sortByPriority(notifications).slice(0, limit);
}
