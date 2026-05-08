export * from './consent-not-accepted.exception'
export * from './email-already-exists.exception'
export * from './user-not-found.exception'
export * from './wrong-security-token.exception'
// Re-exported from shared/domain/exceptions — the User entity (shared) throws these
export {
  BlockedByAdminException,
  BlockedByWrongLoginTriesException,
  EmailNotConfirmedException,
  InvalidCredentialsException,
} from '~/shared/domain/exceptions'
