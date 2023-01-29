import { TaskQueue } from '../WebSpider/QueuesToTheRescue/QueueLimitingConcurrency.js';
import { recursiveFind } from './excercise3.js';

const queue = new TaskQueue(2);
recursiveFind('../WebSpider', 'hello', queue);
