import { Injectable, Logger } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class CURLService {
  private readonly logger = new Logger(CURLService.name);
  async executeCurlCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // const command = `curl -X GET "https://www.geeksforgeeks.org" -H "Authorization: Bearer your-token"`;
      try {
        const resp = execSync(command);
        const result = resp.toString();
        this.logger.debug('result', JSON.stringify(result));
        resolve(result);
        // exec(command, (error, stdout, stderr) => {
        //   if (error) {
        //     this.logger.error(`Error: ${JSON.stringify(error)}`);
        //     reject(`Error: ${error.message}`);
        //   } else if (stderr) {
        //     this.logger.error(`Stderr:  ${JSON.stringify(stderr)}`);
        //     reject(`Stderr: ${stderr}`);
        //   } else {
        //     resolve(stdout);
        //   }
        // });
      } catch (e) {
        reject(null);
        this.logger.error('executeCurlCommand is ERROR', JSON.stringify(e));
        return null;
      }
    });
  }
}
