/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */
import {get, put} from "./utils/memcache.js";
import {putToCache, getValueFromCache} from "./cache.js";

console.log("calling get main");
//get();
console.log("calling set main");
//put();
console.log("calling get main");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    const start = process.hrtime();
    const numRequests = 1000000;
    let numResponses = 0;
    setInterval(() => {
        console.log("tps: ", numResponses);
        numResponses = 0;
    }, 1000);

    for (let j = 0; j < numRequests; j++) {
        get().then(() => {
            numResponses++;
        });
    }
}

//demo();

async function demoSerial() {
    const start = process.hrtime();
    const numRequests = 1000000;
    let numResponses = 0;
    setInterval(() => {
        console.log("tps: ", numResponses);
        numResponses = 0;
    }, 1000);

    for (let j = 0; j < numRequests; j++) {
        let promises = [];
        promises.push(get());
        promises.push(get());
        promises.push(get());
        promises.push(get());
        promises.push(get());
        promises.push(get());
        promises.push(get());
        promises.push(get());
        promises.push(get());
        promises.push(get());
        await Promise.all(promises);
        numResponses += 10;
    }

    // const stop = process.hrtime(start);
    // const totalTime = (stop[0] * 1e9 + stop[1]) / 1e9;
    // const tps = numberOfGets/totalTime;
    //
    // console.log(`Done tps ${tps} Total time is ${totalTime} seconds`);
}


//demoSerial();
async function demoLib() {
    await putToCache('Charly', 'Abraham', 1000);
    const numRequests = 1000;
    let numResponses = 0;
    for (let j = 0; j < numRequests; j++) {
        let promises = [];
        promises.push(getValueFromCache(`Charly`));
        promises.push(getValueFromCache(`Charly`));
        promises.push(getValueFromCache(`Charly`));
        promises.push(getValueFromCache(`Charly`));
        promises.push(getValueFromCache(`Charly`));
        promises.push(getValueFromCache(`Charly`));
        promises.push(getValueFromCache(`Charly`));
        promises.push(getValueFromCache(`Charly`));
        promises.push(getValueFromCache(`Charly`));
        promises.push(getValueFromCache(`Charly`));

        await Promise.all(promises);
        try {
            const value = await getValueFromCache(`Charly`);
            console.log(value);
        } catch (e){
            console.error(e);
        }


        // eslint-disable-next-line no-unused-vars
        numResponses += 10;
    }

}

demoLib();


