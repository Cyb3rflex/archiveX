// Audit logging service.
// Logs sensitive admin actions to the console in structured JSON format.
// In production, this would write to a database table or external service.

'use strict';

/**
 * Log an admin action for audit purposes.
 * @param {object} options
 * @param {string} options.action — e.g. "faculty.create"
 * @param {string} options.userId — Admin ID
 * @param {string} options.userEmail
 * @param {string} options.resource — e.g. "faculty"
 * @param {string} options.resourceId
 * @param {object} [options.metadata]
 */
function log({ action, userId, userEmail, resource, resourceId, metadata }) {
  const entry = {
    timestamp: new Date().toISOString(),
    type: 'AUDIT',
    action,
    actor: { id: userId, email: userEmail },
    resource: { type: resource, id: resourceId },
    metadata: metadata || {},
  };
  // JSON line for easy ingestion by log aggregators (Datadog, CloudWatch, etc.)
  console.log(JSON.stringify(entry));
}

module.exports = { log };
