'use client';

import { Button } from '@workspace/ui/components/button';
import { CardPadding } from '@/components/card';
import { InputToggle } from '@/components/input-toggle';
import { PasswordField } from '@/components/inputs/password-field';
import { TextField } from '@/components/inputs/text-field';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';

export default function Components() {
  return (
    <CardPadding asChild>
      <form
        autoComplete="off"
        className={cn(
          surfaceVariants({ variant: 'primary' }),
          'gap-lg flex max-w-lg flex-col',
        )}
      >
          <TextField label="Test 1" placeholder="Testing" pattern=".*\S.*" />
          <TextField label="Test 2" placeholder="Testing" pattern=".*\S.*" />
          <PasswordField
            label="Password"
            placeholder="Testing"
            pattern=".*\S.*"
          />
          <InputToggle label="hello" />
          <Button variant="primary" size="md">
            Submit
          </Button>
      </form>
    </CardPadding>
  );
}
