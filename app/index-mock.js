/**
 * @author Wael Jammal
 *
 * The main entry point for the app.
 */
import Bootstrap from './common/globals/bootstrap';

// Global dependencies bootstrap
let bootstrap = new Bootstrap();
bootstrap
    .add(require('./common/services/mock/index'))
    .start();