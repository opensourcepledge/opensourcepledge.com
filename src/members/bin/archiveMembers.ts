#!/usr/bin/env -S npx tsx

// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

// Must be run in repository root.

import fs from "fs";
import { execSync } from "child_process";
import { getMembers } from "../../members/common.ts";
import dayjs from 'dayjs';


function main() {
  const members = getMembers();

  for (const member of members) {
    for (const report of member.annualReports) {
      const archiveDir = `./archives/reports/${member.id}/${report.year}/`;
      const archiveFilename = `${dayjs().toISOString()}.html`;
      const archivePath = `${archiveDir}${archiveFilename}`;
      const latestArchivePath = `${archiveDir}latest.html`;
      fs.mkdirSync(archiveDir, { recursive: true });

      const command = `monolith '${report.url}' -o '${archivePath}'`;
      try {
        console.log('Archiving...');
        console.log(`\tRemote URL: ${report.url}`);
        console.log(`\tLocal path: ${archivePath}`);
        console.log(`\tInvocation: ${command}`);
        execSync(command, { stdio: 'pipe' });
        if (!fs.existsSync(archivePath)) {
          throw new Error(`Expected file to exist, but it did not, so archival failed: ${archivePath}`);
        }
        const lstat = fs.lstatSync(latestArchivePath, { throwIfNoEntry: false });
        if (lstat) {
          fs.unlinkSync(latestArchivePath);
        }
        console.log(`Creating symlink: ${latestArchivePath} -> ${archiveFilename}`);
        fs.symlinkSync(archiveFilename, latestArchivePath);
        console.log('');
      } catch (error: any) {
        console.error('ERROR: Could not archive report.');
        console.error('');
        console.error('The most common cause is not having `monolith` installed.');
        console.error('You should install it using your package manager.');
        console.error('Read more here: https://github.com/Y2Z/monolith');
        console.error('');
        console.error('Error information:');
        console.error(`\tRemote URL: ${report.url}`);
        console.error(`\tLocal path: ${archivePath}`);
        console.error(`\tInvocation: ${command}`);
        console.error(`\tError code: ${error.status}`);
        console.error(`\tError message: ${error.message.replace('\n', '\n\t\t').trim()}`);
        console.error('');
        console.error('Stopping without attempting to archive further reports.');
        process.exit(1);
      }
    }
  }
}


main()
