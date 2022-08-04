import * as React from 'react';
import {CodeBlock, Snippet} from '../src';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Components/Code Block',
  component: CodeBlock,
};

export const Default = (): React.ReactNode => {
  return <Snippet language="java">{`Initial story`}</Snippet>;
};

export const Multiline = (): React.ReactNode => (
  <Snippet
    language="php"
    maxLines={10}
    githubLink="https://github.com/TwilioDevEd/api-snippets/blob/master/quickstart/php/sms/send_sms/send_sms.5.x.php"
  >
    {`<?php
require __DIR__ . '/vendor/autoload.php';
use Twilio\Rest\Client;

// Your Account SID and Auth Token from twilio.com/console
$account_sid = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX';
$auth_token = 'your_auth_token';
// In production, these should be environment variables. E.g.:
// $auth_token = $_ENV["TWILIO_AUTH_TOKEN"]

// A Twilio number you own with SMS capabilities
$twilio_number = "+15017122661";

$client = new Client($account_sid, $auth_token);
$client->messages->create(
    // Where to send a text message (your cell phone?)
    '+15558675310',
    array(
        'from' => $twilio_number,
        'body' => 'I sent this message in under 10 minutes!'
    )
);`}
  </Snippet>
);
