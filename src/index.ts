import { configuration } from './configuration';
import generation from './generation';


const generator = generation();
configuration(generator);
