import { SSTConfig } from 'sst';
import { Bucket, StackContext, NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'my-example-app3',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }: StackContext) {
      const bucket = new Bucket(stack, 'public');
      const site = new NextjsSite(stack, 'site', {
        permissions: [bucket],
        bind: [bucket],
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
